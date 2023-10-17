
from celery import shared_task
from busbookingApp.celery import app
from channels.layers import get_channel_layer
from celery import Celery,states
from celery.exceptions import Ignore

from asgiref.sync import async_to_sync
import asyncio
import json
from .models import UserNotifications



@shared_task(bind = True)
def broadcastnotification(self,data):
    try:
        print("12345")
        print("data..",data)
        print("MNOPQ")

        groupname = UserNotifications.objects.filter(id = int(data)).first().groupName
        notification = UserNotifications.objects.filter(id = int(data)).first().notifications

        channel_layer = get_channel_layer()

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(channel_layer.group_send(
            groupname,
                    {
                    'type':'send_notification',
                    'message': json.dumps(notification),
                    })
                )

        UserNotifications.objects.filter(id = int(data)).update(sent=True)
        return " message send to group"
    
        # if len(notification)>0:
        #     notification = notification.first()
        #     groupname = notification.groupName
        #     channel_layer = get_channel_layer()

        #     loop = asyncio.new_event_loop()
        #     asyncio.set_event_loop(loop)
        #     loop.run_until_complete(channel_layer.group_send(
        #     groupname,
        #     {
        #     'type':'send_notification',
        #     'message': json.dumps(notification.notifications),
        #     })
        #     )
            # notification.sent = True
            # notification.save()
            # return 'done'
        
        # else:
        #     self.update_state(
        #         state = 'Failure',
        #         meta = {"exe":"Not Found"},
        #         )
        #     raise Ignore()


    except:
        self.update_state(
                state = 'Failure',
                meta = {"exe":"Not Found"},
                )
        raise Ignore()
    
    
