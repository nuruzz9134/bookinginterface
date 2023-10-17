from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
# from django_celery_beat.models import PeriodicTask,CrontabSchedule
from django_celery_beat.models import CrontabSchedule, PeriodicTask
import json
from celery import current_app
from django.db import transaction
import random


User = get_user_model()

routeChoice = [
    ('bankura_durgapur','bnk_dur'),
    ('durgapur_bankura','dur_bnk'),
    ('bankura_karunamoyee','bnk_krnmoy'),
    ('karunamoyee_bankura','krnmoy_bnk'),
    ('durgapur_karunamoyee','dur_krnmoy'),
    ('karunamoyee_durgapur','krnmoy_dur')
]


class BusModel(models.Model):
    number = models.CharField(max_length=15,blank=True,null=True)
    route = models.CharField(max_length= 50 ,choices=routeChoice)
    day = models.CharField(max_length= 250 ,blank=True,null=True)
    time = models.TimeField(blank=True,null=True)
    seats = models.PositiveIntegerField(blank=True,null=True)
    travel_fee = models.PositiveIntegerField(blank=True,null=True)

    def __str__(self):
        return str(self.id)


class BusBookingModel(models.Model):
    BusTransportDayId = models.CharField(max_length= 100 ,blank=True,null=True)
    UserBookingId = models.CharField(max_length= 100 ,blank=True,null=True)
    bus = models.ForeignKey(BusModel,related_name='busmodel', on_delete=models.CASCADE,blank=True,null=True)
    passenger = models.ForeignKey(User,related_name='passengerID',on_delete=models.CASCADE,blank=True,null=True)
    seat = models.CharField(max_length=250,blank=True,null=True)
    date = models.DateField(blank=True,null=True)

    def __str__(self):
        return str(self.id)
    
    @staticmethod
    def user_order_details(userbookingid):
        instance = BusBookingModel.objects.filter(UserBookingId = userbookingid).first()
        
        data = {}
        data['busid'] = instance.bus_id
        data['passanger'] = instance.passenger_id
        data['bus'] = instance.BusTransportDayId
        data['bookingId'] = instance.UserBookingId
        data['seats'] = instance.seat
        data['date'] = instance.date

        return data

    


class BookedBusSeatsModel(models.Model):
    bus = models.ForeignKey(BusBookingModel,
                            related_name='bookedbusseats',
                            on_delete=models.CASCADE,
                            blank=True,null=True)
    seats = models.CharField(max_length=250,blank=True,null=True)
    available_seats = models.IntegerField(blank=True,null=True)
    date = models.DateField(blank=True,null=True)

    def __str__(self):
        return str(self.id)


class UserNotifications(models.Model):
    user = models.ForeignKey(User,related_name='userID',on_delete=models.CASCADE)
    groupName = models.CharField(max_length=100,blank=True,null=True)
    notifications = models.TextField(max_length=300,blank=True,null=True)
    sent_time = models.DateTimeField(blank=True,null=True)
    sent = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-sent_time']
    
    def __str__(self):
        return str(self.id)

    

@receiver(post_save,sender = UserNotifications)
def notification_handeler(sender,instance,created,**kwargs):
    if created:
        schedule,created= CrontabSchedule.objects.get_or_create(
            # hour = instance.sent_time.hour,
            # minute = instance.sent_time.minute,
            # day_of_month = instance.sent_time.day,
            # month_of_year = instance.sent_time.month
            
            # )

            minute='35',
            hour='9',
            day_of_month='17',
            month_of_year='10'

            )
        
        task = PeriodicTask.objects.create(
            crontab = schedule,
            name=f'{instance.groupName}<<>>{random.randint(10 , 999900)}',
            task ="mainapp.tasks.broadcastnotification",
            args = json.dumps((str(instance.id),)),
            )
        