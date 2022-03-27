from django.utils.translation import gettext_lazy as __
from rest_framework import request, response, status, views

from customer import permissions, serializers
from websockets import triggers


class ServiceOrderView(views.APIView):

    permission_classes = [permissions.IsAuthenticatedCustomer]

    def post(self, request: request.Request) -> response.Response:
        book_service_serializer = serializers.BookServiceSerializer(
            data={**request.data, 'customer': request.user.id}
        )
        book_service_serializer.is_valid(raise_exception=True)
        booked_service = book_service_serializer.save()
        triggers.trigger_service_orders_channel(booked_service.offer_id)
        return response.Response(
            {
                'token': booked_service.token,
                'detail': __('Use this token to confirm or cancel your reservation.'),
            },
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request: request.Request) -> response.Response:
        cancel_service_serializer = serializers.CancelServiceSerializer(data=request.data)
        cancel_service_serializer.is_valid(raise_exception=True)
        canceled_service = cancel_service_serializer.save()
        triggers.trigger_service_orders_channel(canceled_service.offer_id)
        return response.Response(
            {'detail': __('Barber service canceled.')},
            status=status.HTTP_200_OK,
        )
