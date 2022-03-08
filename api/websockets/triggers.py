import json

from asgiref import sync
from channels import layers

from websockets import templates, utils


def trigger_service_offer_channel(service_offer_id: int) -> None:
    service_orders = utils.get_active_service_orders(service_offer_id)
    serialized_orders = utils.serialize_service_orders(service_orders)
    _send_service_offer_notification(serialized_orders, service_offer_id)


def _send_service_offer_notification(data: list, service_offer_id: int) -> None:
    channel_layer = layers.get_channel_layer()
    message = {"type": "service_offer_message", "text": json.dumps(data)}
    sync.async_to_sync(channel_layer.group_send)(  # type:ignore
        templates.SERVICE_OFFER_GROUP.format(service_offer_id), message
    )
