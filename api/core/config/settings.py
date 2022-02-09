'''
Django settings for core project.

Generated by 'django-admin startproject' using Django 4.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
'''

import os

from core.config import utils

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = utils.get_env_value('DJANGO_SECRET_KEY')
DEBUG = utils.get_env_value('DJANGO_DEBUG', 'false').lower() == 'true'
ALLOWED_HOSTS = utils.get_env_value('DJANGO_ALLOWED_HOSTS').split()

# NOTE psycopg2-binary dependency must be installed to make django app working with postgres.
# TODO not sure if needed | install -> add to installed apps
# djangochannelsrestframework -> djangochannelsrestframework
# django-extensions -> django_extensions
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_prometheus',
    'rest_framework',
    'channels',
    'corsheaders',
    'authentication',
    'barber',
    'customer',
]

# TODO corsheaders may me a cause of issue if you will be stuck
MIDDLEWARE = [
    'django_prometheus.middleware.PrometheusBeforeMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_prometheus.middleware.PrometheusAfterMiddleware',
]


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ASGI_APPLICATION = 'core.asgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django_prometheus.db.backends.postgresql',
        'NAME': utils.get_env_value('POSTGRES_DB'),
        'HOST': utils.get_env_value('POSTGRES_HOST', 'db'),
        'USER': utils.get_env_value('POSTGRES_USER'),
        'PASSWORD': utils.get_env_value('POSTGRES_PASSWORD'),
        'PORT': int(utils.get_env_value('POSTGRES_PORT', '5432')),
    }
}


# Remember to override AUTH_USER_MODEL when you want to use a custom User model.
AUTH_USER_MODEL = 'authentication.User'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'core.validators.PasswordLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.AllowAny',),
}


CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [utils.get_env_value('CELERY_BROKER_URL')],
        },
    },
}


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


ROOT_URLCONF = 'core.urls'

# TODO THIS ONE CAN BE IMPORTANT. GOOGLE IT TO MAKE SURE. Hmm why it is hardcoded in settings?
ROOT_URL = 'http://172.104.240.119:3000'

MEDIA_URL = utils.get_env_value('DJANGO_MEDIA_URL')
MEDIA_ROOT = '/var/lib/media'

STATIC_URL = utils.get_env_value('DJANGO_STATIC_URL')
STATIC_ROOT = '/var/lib/static'

DJANGO_LOG_LEVEL = utils.get_env_value('DJANGO_LOG_LEVEL', 'WARNING')

CELERY_BROKER_URL = utils.get_env_value('CELERY_BROKER_URL')
CELERY_RESULT_BACKEND = utils.get_env_value('CELERY_RESULT_BACKEND')
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = utils.get_env_value('DJANGO_CORS_ORIGIN_WHITELIST').split()
CSRF_TRUSTED_ORIGINS = utils.get_env_value('DJANGO_CSRF_TRUSTED_ORIGINS').split()
CORS_ALLOW_CREDENTIALS = (
    utils.get_env_value('DJANGO_CORS_ALLOW_CREDENTIALS', 'false').lower() == 'true'
)


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file_django': {
            'level': DJANGO_LOG_LEVEL,
            'class': 'logging.FileHandler',
            'formatter': 'verbose',
            'filename': '/var/log/api/django/django.log',
        },
        'file_error': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'formatter': 'verbose',
            'filename': '/var/log/api/django/error.log',
        },
        'file_root': {
            'level': DJANGO_LOG_LEVEL,
            'class': 'logging.FileHandler',
            'formatter': 'verbose',
            'filename': '/var/log/api/django/root.log',
        },
    },
    'root': {
        'handlers': ['console', 'file_root'],
        'level': DJANGO_LOG_LEVEL,
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file_django'],
            'level': DJANGO_LOG_LEVEL,
            'propagate': True,
        },
        'django.request': {
            'handlers': ['console', 'file_error'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
