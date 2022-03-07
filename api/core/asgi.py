'''
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
'''
# flake8: noqa # pylint: disable=C0411,C0413
import django

django.setup()

import os

from channels import auth, http, routing
from channels.security import websocket
from django.conf import urls

from websockets import consumers

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.config.settings')

application = routing.ProtocolTypeRouter(
    {
        'http': http.AsgiHandler(),
        'websocket': websocket.AllowedHostsOriginValidator(
            auth.AuthMiddlewareStack(
                routing.URLRouter(
                    [
                        urls.url(
                            'websockets/notification/', consumers.ServiceOrderConsumer.as_asgi()
                        ),
                    ]
                )
            ),
        ),
    }
)
