# type:ignore
from django.contrib import admin

from customer import models, utils, value_objects as customer_value_objects


@admin.action(description='Renew selected service orders')
def make_new(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to NEW.'''
    queryset.update(status=customer_value_objects.ServiceOrderStatus.NEW.name)


@admin.action(description='Close selected service orders')
def make_closed(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to CLOSED.'''
    queryset.update(status=customer_value_objects.ServiceOrderStatus.CLOSED.name)


@admin.action(description='Confirm selected service orders')
def make_confirmed(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to HIDDEN.'''
    queryset.update(status=customer_value_objects.ServiceOrderStatus.CONFIRMED.name)


@admin.register(models.ServiceOrder)
class ServiceOrderAdmin(admin.ModelAdmin):
    list_display = (
        'token',
        'service_time',
        'status',
        'customer',
        'offer',
    )
    list_filter = (utils.ServiceOrderStatusFilter, utils.OrderServiceTimeFilter)
    actions = (make_new, make_confirmed, make_closed)
    search_fields = ('token',)
    raw_id_fields = ('customer', 'offer')

    def get_readonly_fields(self, request, obj=None):
        only_admin_editable_fields = (
            'token',
            'service_time',
            'customer',
            'offer',
        )
        if obj and not request.user.is_admin:
            return self.readonly_fields + only_admin_editable_fields
        return self.readonly_fields

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if not request.user.is_admin:
            return qs.filter(offer__author=request.user)
        return qs
