import os
from django.urls import re_path
from . import consumer

# r"^notifications/(?P<stream>\w+)/$"

websocket_urlpatterns = [
    re_path("notifications/(?P<userbookingid>\w+)/$", consumer.NotificationConsumer.as_asgi()),
   
]