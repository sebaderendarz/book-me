import enum
import typing
from django.core import exceptions
from django.utils import timezone

from api.core import utils


def get_email_confirmation_token_expiration_time() -> timezone.datetime:
    '''Get email confirmation token expiration datetime from environment variable.'''
    env_var_name = 'EMAIL_CONFIRMATION_TOKEN_TTL'
    try:
        expiration_time = int(utils.get_env_value(env_var_name, '240'))
    except ValueError:
        exceptions.ImproperlyConfigured(f'Set int value for {env_var_name} environment variable.')
    if expiration_time <= 0:
        exceptions.ImproperlyConfigured(f'Set positive int value for {env_var_name} environment variable.')
    return timezone.now() + timezone.timedelta(minutes=expiration_time)


def enum_to_char_field_args(enum_object: typing.Type[enum.Enum]) -> typing.Dict:  # type: ignore
    '''Convert enum to char field when defining a model.'''
    return {
        'max_length': max(len(constant.name) for constant in enum_object),
        'choices': [(constant.name, constant.value) for constant in enum_object],
    }


def flat_dictionary(dictionary: typing.Dict, parent_key: str = '', sep: str = '') -> typing.Dict:
    ''' Source: https://stackoverflow.com/questions/6027558/flatten-nested-dictionaries-compressing-keys'''
    items: typing.List[typing.Tuple[str, typing.Any]] = []
    for key, value in dictionary.items():
        new_key_name = f'{parent_key}{sep}{key}'
        if isinstance(value, dict):
            items.extend(flat_dictionary(value, new_key_name, '_').items())
        else:
            items.append((new_key_name, value))
    return dict(items)
