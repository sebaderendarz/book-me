# type:ignore
from datetime import date, datetime, timedelta

from django.contrib import admin
from django.forms import models
from django.utils import safestring
from django.utils.translation import gettext_lazy as __

from barber import models as barber_models, utils, value_objects as barber_value_objects
from customer import models as customer_models, value_objects as customer_value_objects


class PendingServiceOrderFormSet(models.BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.can_delete = False


class PendingServiceOrderInline(admin.TabularInline):
    model = customer_models.ServiceOrder
    formset = PendingServiceOrderFormSet
    max_num = 0
    raw_id_fields = ('customer',)
    readonly_fields = (
        'token',
        'service_time',
        'customer',
    )
    verbose_name = __('Pending Service Order')
    verbose_name_plural = __('Pending Service Orders')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        now_minus_30_min = datetime.now() - timedelta(minutes=30)
        return (
            qs.filter(service_time__gt=now_minus_30_min)
            .exclude(status=customer_value_objects.OrderStatus.CLOSED.name)
            .order_by('service_time')
        )


class ServiceUnavailabilityInline(admin.TabularInline):
    model = barber_models.ServiceUnavailability
    extra = 0
    verbose_name = __('Service Unavailability')
    verbose_name_plural = __('Service Unavailabilities')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(end_date__gte=date.today()).order_by('start_date')


@admin.action(description=__('Activate selected service offers'))
def make_active(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to ACTIVE.'''
    queryset.update(status=barber_value_objects.OfferStatus.ACTIVE.name)


@admin.action(description=__('Close selected service offers'))
def make_closed(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to CLSOED.'''
    queryset.update(status=barber_value_objects.OfferStatus.CLOSED.name)


@admin.action(description=__('Hide selected service offers'))
def make_hidden(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to HIDDEN.'''
    queryset.update(status=barber_value_objects.OfferStatus.HIDDEN.name)


@admin.register(barber_models.ServiceOffer)
class ServiceOfferAdmin(admin.ModelAdmin):

    inlines = (ServiceUnavailabilityInline, PendingServiceOrderInline)
    list_display = (
        'barber_name',
        'city',
        'address',
        'description',
        'price',
        'open_hours',
        'working_days',
        'status',
        'barber_image',
    )
    list_filter = (utils.OfferStatusFilter, utils.OpenHoursFilter, utils.WorkingDaysFilter)
    actions = (make_active, make_closed, make_hidden)
    search_fields = ('barber_name', 'city', 'address')

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ('image_view',)
        return self.readonly_fields

    def has_delete_permission(self, request, obj=None):
        return False

    def image_view(self, obj):
        return safestring.mark_safe(
            '<a href={url}><img src="{url}" width={width} height={height} /></a>'.format(
                url=obj.image.url,
                width=obj.image.width,
                height=obj.image.height,
            )
        )

    def barber_image(self, obj):
        return safestring.mark_safe(
            '<a href={url}><img src="{url}" width={width} height={height} /></a>'.format(
                url=obj.image.url,
                width=obj.image.width / 2.5,
                height=obj.image.height / 2.5,
            )
        )
