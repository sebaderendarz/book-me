from typing import Any

from django.utils.translation import gettext_lazy as __
from rest_framework import request, response, status, viewsets

from barber import models, serializers


class ServiceOfferViewSet(viewsets.ReadOnlyModelViewSet):
    def retrieve(self, request: request.Request, *args: Any, **kwargs: Any) -> response.Response:
        service_offer = models.ServiceOffer.objects.filter(id=kwargs['id']).first()
        if service_offer is None:
            return response.Response(
                {'detail': __('No service offer found with specified id.')},
                status=status.HTTP_404_NOT_FOUND,
            )
        offer_serializer = serializers.ServiceOfferSerializer(service_offer)
        return response.Response(offer_serializer.data, status=status.HTTP_200_OK)
