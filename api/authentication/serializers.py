from django.contrib.auth import models
from rest_framework import exceptions  # type: ignore
from rest_framework_simplejwt import serializers, tokens  # type: ignore

from authentication import value_objects


class TokenObtainPairAdminSerializer(serializers.TokenObtainSerializer):  # pylint: disable=W0223
    '''Create access and initial refresh admin tokens.'''

    token_class = tokens.RefreshToken

    def validate(self, attrs: dict) -> dict:
        data = super().validate(attrs)
        self._validate_if_admin()

        refresh = self.get_token(self.user)
        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)

        return data

    def get_token(self, user: models.AbstractUser) -> tokens.RefreshToken:
        return self.token_class.for_user(user)

    def _validate_if_admin(self) -> None:
        if not self.user.is_admin:
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )


class TokenObtainPairBarberSerializer(serializers.TokenObtainSerializer):  # pylint: disable=W0223
    '''Create access and initial refresh barber tokens.'''

    token_class = tokens.RefreshToken

    def validate(self, attrs: dict) -> dict:
        data = super().validate(attrs)
        self._validate_if_barber()

        refresh = self.get_token(self.user)
        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)

        return data

    def get_token(self, user: models.AbstractUser) -> tokens.RefreshToken:
        return self.token_class.for_user(user)

    def _validate_if_barber(self) -> None:
        if self.user.account_type != value_objects.AccountType.BARBER.value:
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )


class TokenObtainPairCustomerSerializer(serializers.TokenObtainSerializer):  # pylint: disable=W0223
    '''Create access and initial refresh customer tokens.'''

    token_class = tokens.RefreshToken

    def validate(self, attrs: dict) -> dict:
        data = super().validate(attrs)
        self._validate_if_customer()

        refresh = self.get_token(self.user)
        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)

        return data

    def get_token(self, user: models.AbstractUser) -> tokens.RefreshToken:
        return self.token_class.for_user(user)

    def _validate_if_customer(self) -> None:
        if self.user.account_type != value_objects.AccountType.CUSTOMER.value:
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )
