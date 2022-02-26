from rest_framework_simplejwt import views  # type: ignore

from authentication import serializers


class TokenObtainPairAdminView(views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairAdminSerializer


class TokenObtainPairBarberView(views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairBarberSerializer


class TokenObtainPairCustomerView(views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairCustomerSerializer
