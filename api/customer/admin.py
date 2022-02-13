# type:ignore
from django.contrib import admin

from customer import models, utils, value_objects


@admin.action(description='Renew selected service orders')
def make_new(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to NEW.'''
    queryset.update(status=value_objects.OrderStatus.NEW.name)


@admin.action(description='Close selected service orders')
def make_closed(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to CLOSED.'''
    queryset.update(status=value_objects.OrderStatus.CLOSED.name)


@admin.action(description='Confirm selected service orders')
def make_confirmed(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to HIDDEN.'''
    queryset.update(status=value_objects.OrderStatus.CONFIRMED.name)


@admin.register(models.ServiceOrder)
class ServiceOrderAdmin(admin.ModelAdmin):
    list_display = (
        'token',
        'service_time',
        'status',
        'customer',
        'offer',
    )
    list_filter = (utils.OrderStatusFilter, utils.OrderServiceTimeFilter)
    actions = (make_new, make_confirmed, make_closed)
    search_fields = ('token',)
