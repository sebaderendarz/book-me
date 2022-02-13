from django.core import validators
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
    # Service can be booked only in regular, 30 minutes periods (2PM, 2:30PM, 3PM...)
    # and for the time of a day when barber is available.
    service_time = models.DateTimeField(__('Service Time'))
    token = models.CharField(
        __('Token'),
        max_length=8,
        validators=[validators.MinLengthValidator(8)],
        unique=True,
        default=customer_utils.generate_short_uuid,  # type:ignore
    )
    status = models.CharField(
        __('Status'),
        default=value_objects.OrderStatus.NEW.name,
        **core_utils.enum_to_char_field_args(value_objects.OrderStatus),
    )
    customer = models.ForeignKey(auth_models.User, on_delete=models.PROTECT)
    offer = models.ForeignKey(barber_models.ServiceOffer, on_delete=models.PROTECT)

    def __str__(self) -> str:
        '''Example: "XY2M76PO 2022-02-13 07:39AM".'''
        return f'{self.token} {self.service_time.strftime("%Y-%m-%d %I:%M%p")}'
