from rest_framework import serializers
from mainapp.models import *

class BusModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BusModel
        fields='__all__'

class BusBookingModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BusBookingModel
        fields='__all__'

class BookedBusSeatsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BookedBusSeatsModel
        fields='__all__'

class UserNotificationsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserNotifications
        fields='__all__'