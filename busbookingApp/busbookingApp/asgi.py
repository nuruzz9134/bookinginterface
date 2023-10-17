
import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from mainapp.routing import websocket_urlpatterns
import mainapp.routing

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'busbookingApp.settings')

application = get_asgi_application()

application = ProtocolTypeRouter({
    'http': application,
    'websocket': AuthMiddlewareStack(
                             URLRouter(
                               mainapp.routing.websocket_urlpatterns
                             )
                         )
                    })
