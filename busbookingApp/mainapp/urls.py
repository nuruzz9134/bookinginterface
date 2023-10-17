from django.urls import path
from mainapp.views import *

urlpatterns = [
    path('buses/',AllBusDatas.as_view()),
    path('search/',SearchedBuses.as_view()),
    path('bookedseats/',BookedBusSeats.as_view()),
    path('seatbook/',ConfirmSeatsBooking.as_view()),
    
    path('allnotifications/',ManageNotification.as_view()),
    path('delete_notifications/<int:pk>/',ManageNotification.as_view()),

    path('alltickets/',ManageTickets.as_view()),
    path('delete_tickets/<int:pk>/',ManageTickets.as_view()),
]