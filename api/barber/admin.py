# type:ignore
from django.contrib import admin
from django.utils import safestring

from barber import models, utils, value_objects


@admin.action(description='Activate selected service offers')
def make_active(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to active.'''
    queryset.update(status=value_objects.OfferStatus.ACTIVE.name)


@admin.action(description='Close selected service offers')
def make_closed(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to closed.'''
    queryset.update(status=value_objects.OfferStatus.CLOSED.name)


@admin.action(description='Hide selected service offers')
def make_hidden(modeladmin, request, queryset):  # pylint: disable=unused-argument
    '''Change status of selected offers to hidden.'''
    queryset.update(status=value_objects.OfferStatus.HIDDEN.name)


@admin.register(models.ServiceOffer)
class ServiceOfferAdmin(admin.ModelAdmin):

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
            return self.readonly_fields + ('view',)
        return self.readonly_fields

    def view(self, obj):
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