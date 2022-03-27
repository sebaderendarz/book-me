import json
import logging

from asgiref.sync import sync_to_async
from channels import consumer
from channels.db import database_sync_to_async
from django.db.models import query

from websockets import templates, utils

logger = logging.getLogger('django')


class ServiceUnavailabilitiesConsumer(consumer.AsyncConsumer):
    async def websocket_connect(self, event: dict) -> None:
        '''Connect new user to the group or create a new channel group.'''
        service_offer_id = int(self.scope['url_route']['kwargs']['offer_id'])
        group_name = templates.SERVICE_UNAVAILABILITIES_GROUP.format(service_offer_id)
        await self.channel_layer.group_add(group_name, self.channel_name)
        await self.send({'type': 'websocket.accept'})
        await self.log_debug(f'New user connected to the "{group_name}" channel group.')
        await self._send_notification_to_all_subscribed(service_offer_id)

    async def _send_notification_to_all_subscribed(self, service_offer_id: int) -> None:
        service_unavailabilities = await self._get_future_service_unavailabilities(service_offer_id)
        serialized_unavailabilities = await self._serialize_service_unavailabilities(
            service_unavailabilities
        )
        new_message = await self._prepare_new_message(serialized_unavailabilities)
        await self.channel_layer.group_send(
            templates.SERVICE_UNAVAILABILITIES_GROUP.format(service_offer_id), new_message
        )
        await self.log_debug(f'New message sent "{new_message}"')

    async def _prepare_new_message(self, data: list) -> dict:
        return {
            'type': 'service_unavailabilites_message',
            'text': json.dumps(data),
        }

    @database_sync_to_async
    def _get_future_service_unavailabilities(self, service_offer_id: int) -> query.QuerySet:
        return utils.get_future_service_unavailabilities(service_offer_id)

    @database_sync_to_async
    def _serialize_service_unavailabilities(self, service_unavailabilities: query.QuerySet) -> list:
        return utils.serialize_service_unavailabilities(service_unavailabilities)

    async def websocket_receive(self, event: dict) -> None:
        '''Handle message sent by user. No logic for this as for now.'''
        data = event.get('text', None)
        if not data:
            await self.log_debug('No data in the message')
        await self.log_debug(data)

    async def service_unavailabilites_message(self, event: dict) -> None:
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
