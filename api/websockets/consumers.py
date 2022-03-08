from datetime import datetime
import json
import logging

from asgiref.sync import sync_to_async
from channels import consumer
from channels.db import database_sync_to_async
from django.db.models import query

from customer import models, value_objects

logger = logging.getLogger('django')


SERVICE_OFFER_GROUP = 'service_offer_{}'


class ServiceOrderConsumer(consumer.AsyncConsumer):
    async def websocket_connect(self, event: dict) -> None:
        '''Connect new user to the group or create a new channel group.'''
        service_offer_id = int(self.scope['url_route']['kwargs']['offer_id'])
        group_name = SERVICE_OFFER_GROUP.format(service_offer_id)
        await self.channel_layer.group_add(group_name, self.channel_name)
        await self.send({'type': 'websocket.accept'})
        await self.log_warning(f'New user connected to the "{group_name}" channel group.')
        await self._send_notification_to_all_subscribed(service_offer_id)

    async def _send_notification_to_all_subscribed(self, service_offer_id: int) -> None:
        service_orders = await self._get_active_service_orders(service_offer_id)
        serialized_orders = await self._serialize_service_orders(service_orders)
        new_message = await self._prepare_new_message(serialized_orders)
        await self.channel_layer.group_send(
            SERVICE_OFFER_GROUP.format(service_offer_id), new_message
        )
        await self.log_debug(f'New message sent "{new_message}"')

    async def _prepare_new_message(self, data: list) -> dict:
        return {
            'type': 'service_order_message',
            'text': json.dumps(data),
        }

    @database_sync_to_async
    def _get_active_service_orders(self, service_offer_id: int) -> query.QuerySet:
        return (
            models.ServiceOrder.objects.filter(
                offer_id=service_offer_id, service_time__gt=datetime.now()
            )
            .exclude(status=value_objects.OrderStatus.CLOSED.name)
            .order_by('service_time')
            .all()
        )

    @database_sync_to_async
    def _serialize_service_orders(self, service_orders: query.QuerySet) -> list:
        serialized_orders = []
        for service_order in service_orders:
            serialized_orders.append(service_order.service_time.isoformat())
        return serialized_orders

    async def websocket_receive(self, event: dict) -> None:
        '''Handle message sent by user. No logic for this as for now.'''
        data = event.get('text', None)
        if not data:
            await self.log_debug('No data in the message')
        await self.log_debug(data)

    async def service_order_message(self, event: dict) -> None:
        '''Send the actual message.'''
        await self.send({'type': 'websocket.send', 'text': event['text']})

    @sync_to_async
    def log_debug(self, message: str) -> None:
        '''Log debug info asynchronously.'''
        logger.debug(message)

    @sync_to_async
    def log_warning(self, message: str) -> None:
        '''Log warning asynchronously.'''
        logger.warning(message)

    async def websocket_disconnect(self, event: dict) -> None:
        '''Close channel connection.'''
        raise consumer.StopConsumer()
