from django.db import models
from django.utils.translation import gettext_lazy as __
from django_prometheus import models as prom_models  # type: ignore

from authentication import models as auth_models
from barber import models as barber_models
from core import utils as core_utils
from customer import utils as customer_utils, value_objects


class ServiceOrder(prom_models.ExportModelOperationsMixin('customer.service_order'), models.Model):  # type: ignore
    created_at = models.DateTimeField(__('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(__('Updated at'), auto_now=True)
    service_time = models.DateTimeField(__('Service Time'))
    token = models.CharField(
        __('Token'), max_length=8, unique=True, default=customer_utils.generate_short_uuid
    )
    status = models.CharField(
        __('Status'),
        default=value_objects.OrderStatus.BOOKED.name,
        **core_utils.enum_to_char_field_args(value_objects.OrderStatus),
    )
    customer = models.ForeignKey(auth_models.User, on_delete=models.PROTECT)
    offer = models.ForeignKey(barber_models.ServiceOffer, on_delete=models.PROTECT)
