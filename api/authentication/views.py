from django.utils.translation import gettext_lazy as __
from rest_framework import permissions, response, status, views as rest_views
from rest_framework_simplejwt import views as jwt_views  # type: ignore

from authentication import serializers


class RegisterUserView(rest_views.APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request) -> response.Response:
        user_serializer = serializers.RegisterUserSerializer(data=request.data)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.create(user_serializer.validated_data)
            # TODO add activate account email with confirmation link sending
            return response.Response(
                {'detail': __('Thank You for registering.')}, status=status.HTTP_201_CREATED
            )


class TokenObtainPairAdminView(jwt_views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairAdminSerializer


class TokenObtainPairBarberView(jwt_views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairBarberSerializer


class TokenObtainPairCustomerView(jwt_views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairCustomerSerializer
