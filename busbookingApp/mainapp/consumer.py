from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import StopConsumer
from .models import *
import datetime
from datetime import timedelta,time
import json
from asgiref.sync import async_to_sync,sync_to_async
from channels.db import database_sync_to_async


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["userbookingid"]
        self.room_group_name = "user_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        print("room>>>>",self.room_name)

        await self.accept()
        print("websocket connected........")


        booking_detailed = await sync_to_async(BusBookingModel.user_order_details)(self.room_name)
        
        date = booking_detailed['date']
        dt = datetime.datetime.strftime(date,"%d/%m/%Y")
        b_id = booking_detailed['busid']
        passanger = booking_detailed['passanger']
        seats = booking_detailed['seats']
        userbookingID = booking_detailed['bookingId']


        print("problem date............",date)

        # passangerName = await database_sync_to_async(User.objects.get)(id=passanger)
        # name = passangerName.name
        busNumber = await database_sync_to_async(BusModel.objects.get)(id=b_id)
        number = busNumber.number
        timee = busNumber.time
        t = datetime.time.strftime(timee,"%H:%M:%S")

        msg = f"Hi...your journy will be start at : {t} , bus number : {number} , seats number : {seats} , userbookingid : {userbookingID} , date {dt} .....please be on time...thank you."
        
        subtractTime = datetime.datetime.strptime(t,"%H:%M:%S")
        noticetime = subtractTime - timedelta(hours=1)

        noticeFtime = datetime.datetime.strftime(noticetime,"%H:%M:%S")

        date_time_str = dt +' '+ noticeFtime

        dateTime = datetime.datetime.strptime(date_time_str,"%d/%m/%Y %H:%M:%S")
   
        busNumber = await database_sync_to_async(UserNotifications.objects.create)(
                                                        user_id = passanger,
                                                        groupName = self.room_group_name,
                                                        sent_time = dateTime,
                                                        notifications = msg
                                                        )


    async def send_notification(self, event):
            print(event)
            message = event["message"]
            # text_data=json.dumps(message)
            text_data = message
            print(text_data)

            # Send message to WebSocket
            await self.send(text_data)
            print("data send to script")




    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )