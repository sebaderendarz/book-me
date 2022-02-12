import decimal

from django.core import validators
from django.db import models
from django.utils.translation import gettext_lazy as __
from django_prometheus import models as prom_models  # type: ignore

from barber import value_objects
from core import utils


class ServiceOffer(prom_models.ExportModelOperationsMixin('barber.service_offer'), models.Model):  # type: ignore
    created_at = models.DateTimeField(__('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(__('Updated at'), auto_now=True)
    barber_name = models.CharField(
        __('Barber Name'),
        max_length=100,
        validators=[validators.MinLengthValidator(2)],
    )
    city = models.CharField(
        __('City'),
        max_length=100,
        validators=[validators.MinLengthValidator(2)],
    )
    address = models.CharField(
        __('Address'),
        max_length=100,
        validators=[validators.MinLengthValidator(2)],
    )
    description = models.CharField(
        __('Description'),
        max_length=400,
    )
    price = models.DecimalField(
        __('Price'),
        max_digits=9,
        decimal_places=2,
        validators=[validators.MinValueValidator(decimal.Decimal('0.01'))],
    )
    image = models.ImageField(__('Barber Image'), upload_to='barber/service_offer', blank=True)
    specialization = models.CharField(
        __('Specialization'), **utils.enum_to_char_field_args(value_objects.BarberSpecialization)
    )
    status = models.CharField(
        __('Status'), **utils.enum_to_char_field_args(value_objects.OfferStatus)
    )
    open_hours = models.CharField(
        __('Open Hours'), **utils.enum_to_char_field_args(value_objects.OpenHours)
    )
    working_days = models.CharField(
        __('Working Days'), **utils.enum_to_char_field_args(value_objects.WorkingDays)
    )


class ServiceUnavailability(
    prom_models.ExportModelOperationsMixin('barber.service_unavailability'), models.Model  # type: ignore
):
    created_at = models.DateTimeField(__('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(__('Updated at'), auto_now=True)
    start_date = models.DateField(__('Start Date'))
    end_date = models.DateField(__('End Date'))
    reason = models.CharField(
        __('Reason'),
        max_length=400,
    )
    service_offer = models.ForeignKey(ServiceOffer, on_delete=models.PROTECT)
