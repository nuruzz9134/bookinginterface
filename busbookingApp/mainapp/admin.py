from django.contrib import admin
from mainapp.models import *

# Register your models here.


@admin.register(BusModel)
class BusModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in BusModel._meta.fields
        ]
    
@admin.register(BusBookingModel)
class BusBookingModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in BusBookingModel._meta.fields
        ]
    
@admin.register(BookedBusSeatsModel)
class BookedBusSeatsModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in BookedBusSeatsModel._meta.fields
        ]
    
@admin.register(UserNotifications)
class UserNotificationsModeladmin(admin.ModelAdmin):
    list_display = [
        field.name for field in UserNotifications._meta.fields
        ]