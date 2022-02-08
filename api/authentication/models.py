import uuid

from django.contrib.auth import models as auth_models, password_validation
from django.core import validators
from django.db import models
from django.utils.translation import gettext_lazy as __

from authentication import utils as auth_utils, value_objects
from core import utils as core_utils


class UserManager(auth_models.BaseUserManager):
    '''Form for creating all types of users.'''

    def create_admin(self, email: str, name: str, password: str, surname: str) -> 'User':
        return self._create_user(
            account_type=value_objects.AccountType.ADMIN,
            email=email,
            name=name,
            password=password,
            surname=surname,
        )

    def create_barber(self, email: str, name: str, password: str, surname: str) -> 'User':
        return self._create_user(
            account_type=value_objects.AccountType.BARBER,
            email=email,
            name=name,
            password=password,
            surname=surname,
        )

    def create_customer(self, email: str, name: str, password: str, surname: str) -> 'User':
        return self._create_user(
            account_type=value_objects.AccountType.CUSTOMER,
            email=email,
            name=name,
            password=password,
            surname=surname,
        )

    def create_superuser(self, email: str, name: str, password: str, surname: str) -> 'User':
        return self._create_user(
            account_type=value_objects.AccountType.ADMIN,
            email=email,
            name=name,
            password=password,
            surname=surname,
        )

    def _create_user(
        self,
        account_type: value_objects.AccountType,
        email: str,
        name: str,
        password: str,
        surname: str,
    ) -> 'User':
        user = self.model(
            account_type=account_type.name,
            email=self.normalize_email(email),
            name=name,
            surname=surname,
        )
        password_validation.validate_password(password)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(auth_models.AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(
        __('Email'),
        max_length=150,
        unique=True,
    )
    name = models.CharField(
        __('Name'),
        max_length=100,
        validators=[validators.MinLengthValidator(2)],
    )
    surname = models.CharField(
        __('Surname'),
        max_length=150,
        validators=[validators.MinLengthValidator(2)],
    )
    created_at = models.DateTimeField(__('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(__('Updated at'), auto_now=True)
    email_confirmation_token = models.UUIDField(default=uuid.uuid4)
    email_confirmation_token_ttl = models.DateTimeField(
        default=auth_utils.get_email_confirmation_token_expiration_time
    )
    account_status = models.CharField(
        __('Account Status'),
        default=value_objects.AccountStatus.UNDER_VERIFICATION.name,
        **core_utils.enum_to_char_field_args(value_objects.AccountStatus),
    )
    account_type = models.CharField(
        __('Account Type'), **core_utils.enum_to_char_field_args(value_objects.AccountType)
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname']

    objects = UserManager()

    def __str__(self) -> str:
        '''Human readable representation of object.'''

        return f'{self.name} {self.surname}'

    def delete(self) -> None:
        '''Override model delete method to soft delete User.'''

        if self.account_status not in (
            value_objects.AccountStatus.CLOSED.name,
            value_objects.AccountStatus.DELETED.name,
        ):
            self.account_status = value_objects.AccountStatus.CLOSED.name
            self.save()
