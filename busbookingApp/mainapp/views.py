from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import random
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
import datetime
import time
from datetime import timedelta
from django.utils import timezone
from django.db.models import Q
from .models import *
from .serializer import *
from .models import User





class AllBusDatas(APIView):
    def get(self,request):
        data = BusModel.objects.all()
        serializer = BusModelSerializer(data,many=True)
        return Response(serializer.data)
    


class SearchedBuses(APIView):
    def get(self,request):
        try:
            fromm = request.query_params.get("from",'')
            to = request.query_params.get('to','')
            searched_day = request.query_params.get('day','')
            searched_date = request.query_params.get('date','')

            query = fromm + "_" + to

           
            data = BusModel.objects.filter(
                Q(Q(route__icontains=query))
                )
           
            days=[]
            for i in data:
                spliting = i.day.split(',')
                for j in spliting:
                    if j not in days:
                        days.append(j)

            flag = False
            for day in days:
                if day == searched_day:
                    flag = True
            if flag == False:
                    return Response({"msz": "bus is not available in that day"}, status=HTTP_400_BAD_REQUEST)
            else:
                buses=[]
                for i in data:
                    obj ={}
                    obj={
                        "id":i.id,
                        "number":i.number,
                        "route":i.route,
                        "day":i.day,
                        "time":i.time,
                        "seats":i.seats,
                        "travel_fee":i.travel_fee
                        }
                    obj.update({'date':searched_date})
                    buses.append(obj)
            return Response({"msz":buses}, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({"msz": str(e)}, status=HTTP_400_BAD_REQUEST)



class ConfirmSeatsBooking(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        try:
            busid =request.data['busid'] 
            transportbusid = request.data['busTransportDayId']
            seats = request.data['seats']
            date = request.data['date']
            userid = request.user.id

            userbookingid = str(random.randint(10000000 , 99999999))

            bookingDate = datetime.datetime.strptime(date,"%Y-%m-%d")
            currDateString = datetime.datetime.now().strftime("%Y-%m-%d")
            currDate = datetime.datetime.strptime(currDateString,"%Y-%m-%d")
        
            dayDiff = (bookingDate - currDate).days

            if dayDiff > 7 or dayDiff < 0:
                return Response({'msg':'your date is exceeded'}, status=HTTP_400_BAD_REQUEST)
            else:
                available = True
                if dayDiff == 0:
                    currTime = datetime.datetime.now().time()
                    bus_time = BusModel.objects.get(id =busid).time
                    if bus_time < currTime:
                        available = False
                if available == False:
                    return Response({'msg':'bus already leave from depo'}, status=HTTP_400_BAD_REQUEST)
                else:
                    if BusModel.objects.filter(id=busid).exists():

                        splitOrderedseats = str(seats).split(' ')
                        numberOForderedseats = 0
                        for i in splitOrderedseats:
                            if i != '':
                                numberOForderedseats += 1


                        if BusBookingModel.objects.filter(BusTransportDayId = transportbusid).exists():
                            id = BusBookingModel.objects.filter(BusTransportDayId = transportbusid).first().id

                            bookedseatId = BookedBusSeatsModel.objects.filter(bus=id).first()
                            bookedseats = bookedseatId.seats
                            totalbookedseats = bookedseatId.available_seats

                            splitBookedseats = bookedseats.split(' ')
                            availableSeats = totalbookedseats - numberOForderedseats

                            newbookedSeats = ''
                            seatExist = False
                            for i in range(len(splitBookedseats)):
                                for j in range(len(splitOrderedseats)):
                                    if bookedseats[i] == splitOrderedseats[j]:
                                        seatExist = True
                                        break
                            if seatExist == True:
                                return Response({'msg':'seat already booked'}, status=HTTP_400_BAD_REQUEST)
                            else:
                                newbookedSeats = bookedseats + seats
                                user = userid

                                existedPassenger = BusBookingModel.objects.filter(bus_id = busid,
                                                                  BusTransportDayId = transportbusid,
                                                                  UserBookingId = userbookingid,
                                                                  passenger_id = user,
                                                                  date = date)
                                if existedPassenger.exists():
                                    passangerseats = existedPassenger.first().seat
                                    newpassangerseats = passangerseats + seats
                                    existedPassenger.update(seat = newpassangerseats)


                                else:
                                    BusBookingModel.objects.create(
                                    bus_id = busid,
                                    BusTransportDayId = transportbusid,
                                    UserBookingId = userbookingid,
                                    passenger_id = user,
                                    seat = seats,
                                    date = date
                                    )
                        
                                bustransportdayid = BusBookingModel.objects.filter(BusTransportDayId = transportbusid, date=date).first().id
                         
                                BookedBusSeatsModel.objects.filter(bus_id = bustransportdayid,date=date).update(
                                    available_seats = availableSeats,
                                    seats= newbookedSeats)
                                return Response ({'msg' :'seat booked','userbookingid':userbookingid }, status=HTTP_201_CREATED)


                        else:
                            user = User.objects.filter(id=userid).first().id
                            b_id = BusModel.objects.filter(id=busid).first().id
                            print("user_id",user)
                            print("b_id",b_id)
                            BusBookingModel.objects.create(
                                bus_id = b_id,
                                BusTransportDayId = transportbusid,
                                UserBookingId = userbookingid,
                                passenger_id = user,
                                seat = seats,
                                date = date
                                )
                            id = BusBookingModel.objects.filter(BusTransportDayId = transportbusid).first().id
                            availableSeats =( 40 - numberOForderedseats)
                            BookedBusSeatsModel.objects.create(
                                bus_id = id,
                                seats = seats,
                                available_seats = availableSeats,
                                date = date
                                )
                            print("completed")
                            return Response ({'msg' :'seat booked','userbookingid':userbookingid}, status=HTTP_201_CREATED)


                    else:
                        return Response ({'msg' : "bus does not find"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e :
            return Response({str(e)}, status=HTTP_400_BAD_REQUEST)
        


class BookedBusSeats(APIView):
    def get(self,request):
        searched_bus = request.query_params.get('id','')
        searched_date = request.query_params.get('date','')
        
        try:
            if BusBookingModel.objects.filter(BusTransportDayId=searched_bus,date=searched_date).exists():
                busid = BusBookingModel.objects.filter(BusTransportDayId=searched_bus,date=searched_date).first().id
                seats = BookedBusSeatsModel.objects.filter(bus = busid).first().seats
                print("seats", seats)
                bookedseatsList = seats.split(' ')
                print(bookedseatsList)
                return Response ({'seats':bookedseatsList}, status=HTTP_201_CREATED)
            else:
                return Response ({'seats':None}, status=HTTP_201_CREATED)
        except Exception as e :
            return Response({str(e)}, status=HTTP_400_BAD_REQUEST)
        


class ManageTickets(APIView):
    
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        user = request.user.id
        try:
            booked_data = BusBookingModel.objects.filter(
                passenger = user
                )
            ticket_data = []
            for i in booked_data:
                # print(i.__dict__)
                booked_ticket_dict = {}
                booked_ticket_dict = {
                    "busid": i.bus_id,
                    "bookingId" : i.UserBookingId ,
                    "bustransportDayId":i.BusTransportDayId ,
                    "seats" : i.seat ,
                    "date" : i.date
                }
                bus_data = BusModel.objects.get(id =i.bus_id)
                busNumber = bus_data.number
                busRoute = bus_data.route
                route = busRoute.split('_')
                start = route[0]
                end = route[1]
                time = bus_data.time
                fees = bus_data.travel_fee

                booked_ticket_dict["number"] = busNumber
                booked_ticket_dict["start"] = start
                booked_ticket_dict["end"] = end
                booked_ticket_dict["time"] = time
                booked_ticket_dict["fees"] = fees

                ticket_data.append(booked_ticket_dict)
            return Response (ticket_data, status=HTTP_201_CREATED)
        except Exception as e :
            return Response({str(e)}, status=HTTP_400_BAD_REQUEST)


    def put(self,request,pk):
        try:
            userid = request.user.id
            transportdayid = request.data['transportdayid']
            bookingid = request.data['bookingid']
            seatNumber = request.data['seatNumbers']
            date = request.data['date']


            bookingDate = datetime.datetime.strptime(date,"%Y-%m-%d")
            currDateString = datetime.datetime.now().strftime("%Y-%m-%d")
            currDate = datetime.datetime.strptime(currDateString,"%Y-%m-%d")
        
            dayDiff = (bookingDate - currDate).days
            if dayDiff < 0:
                return Response({'msg':'tickets cancellation time expired'}, status=HTTP_400_BAD_REQUEST)
            else:
                available = True
                if dayDiff == 0:
                    currTime = (datetime.datetime.now() + timedelta(hours=2)).time()
                    bus_time = BusModel.objects.get(id = pk).time
                    if bus_time < currTime:
                        available = False
                if available == False:
                    return Response({'msg':'tickets cancellation time expired'}, status=HTTP_400_BAD_REQUEST)
                else:
                    booked_bus = BusBookingModel.objects.filter(
                                            passenger_id = userid,
                                            bus_id = pk,
                                            BusTransportDayId= transportdayid,
                                            UserBookingId = bookingid,
                                            date=date)
                    
                    booked_busid = booked_bus.first().id
                    bookedSeats = booked_bus.first().seat
                    bookedSeats_arr = bookedSeats.split(' ')
                    bookedSeats_arr_copy = bookedSeats_arr.copy()

                    for booked in bookedSeats_arr:
                        for cancel in seatNumber:
                            if booked == str(cancel):
                                bookedSeats_arr_copy.remove(booked)

                    newSeats = ''
                    for i in bookedSeats_arr_copy:
                        if i != '':
                            newSeats = newSeats + i + ' '
                    booked_bus.update(seat = newSeats) 

                    bookedBus = BookedBusSeatsModel.objects.filter(
                        bus_id = booked_busid,
                        date=date
                        ).first()
                    seats = bookedBus.seats
                    availavleSeats = bookedBus.available_seats
                    seats_arr = seats.split(' ')
                    seats_arr_copy = seats_arr.copy()


                    for booked in seats_arr:
                        for cancel in seatNumber:
                            if booked == str(cancel):
                                seats_arr_copy.remove(booked)

                    updateSeats = ''
                    for k in seats_arr_copy:
                        if k != '':
                            updateSeats = updateSeats + k + ' '

                    avbl_seats = availavleSeats + len(seatNumber)

                    BookedBusSeatsModel.objects.filter(
                        bus_id = booked_busid,
                        date=date).update(
                            seats = updateSeats, 
                            available_seats= avbl_seats
                            )

                    u = BookedBusSeatsModel.objects.get(
                        bus_id = booked_busid,
                        date=date).seats
                    if u == '':
                        BookedBusSeatsModel.objects.get(
                            bus_id = booked_busid,
                            date=date).delete()
                        BusBookingModel.objects.get(
                                            passenger_id = userid,
                                            bus_id = pk,
                                            BusTransportDayId= transportdayid,
                                            UserBookingId = bookingid,
                                            date=date).delete()

                    return Response ({'msg': 'deleted'}, status=HTTP_201_CREATED)
                
        except Exception as e :
            return Response({str(e)}, status=HTTP_400_BAD_REQUEST)
        

class ManageNotification(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        user = request.user.id
        try:
            data = UserNotifications.objects.filter(
                user_id=user
                )
            serializer = UserNotificationsSerializer(data,many=True)
            return Response (serializer.data, status=HTTP_201_CREATED)
        except Exception as e :
            return Response({str(e)}, status=HTTP_400_BAD_REQUEST)


    def delete(self,request,pk):
        try:
            uuu = UserNotifications.objects.get(
                id=pk
                ).delete()
            return Response ({'msg': 'notification deleted'}, status=HTTP_201_CREATED)
        except Exception as e :
            return Response({str(e)}, status=HTTP_400_BAD_REQUEST)
