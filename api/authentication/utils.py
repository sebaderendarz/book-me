from django.core import exceptions
from django.utils import timezone

from core.config import utils


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
