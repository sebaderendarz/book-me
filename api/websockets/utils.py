from datetime import datetime

from django.db.models import query

from customer import models, value_objects


def get_active_service_orders(service_offer_id: int) -> query.QuerySet:
    return (
        models.ServiceOrder.objects.filter(
            offer_id=service_offer_id, service_time__gt=datetime.now()
        )
        .exclude(status=value_objects.OrderStatus.CLOSED.name)
        .order_by('service_time')
        .all()
    )


def serialize_service_orders(service_orders: query.QuerySet) -> list:
    serialized_orders = []
    for service_order in service_orders:
        serialized_orders.append(service_order.service_time.isoformat())
    return serialized_orders
