from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from registration.serializer import *
from registration.models import *
from registration.utils import *



#generating Token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class Creatsuperuserview(APIView):
    def post (self,request,format=None):
        serializer = superuserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            superuser = serializer.save()
            token = get_tokens_for_user(superuser)
            return Response(
                {'token':token, 'msg': 'super user creat Successfull'},
                status = status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class UserRegistrationView(APIView):
    def post (self,request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            email = serializer.data['email']
            return Response(
                {'msg': 'Registration Successfull',
                 'email':email},
                status = status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLoginView(APIView):
    def post(self,request,format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                send_otp_via_email(serializer.data['email'])
                return Response(
                    {'msg': 'OTP send to your email',
                     'email':email},
                    status = status.HTTP_200_OK
                )
            else:
                return Response(
                    # {'errors': {'non_field_error': ['Email or Password is not valid']}},
                    {'errors': 'Email does not exist, please register'},
                    status = status.HTTP_400_BAD_REQUEST)
            


class VerifyOTP(APIView):
    def post(self,request):
        try:
            data = request.data
            serializer = VerifyAccountSerializer(data=data)

            if serializer.is_valid():
                email = serializer.data['email']
                otp = serializer.data['otp']

                user = User.objects.filter(email=email)

                if not user.exists():
                        return Response(
                        {
                            'status' : 400,
                            'message' : 'Somethimg went wrong',
                            'data': 'invalid email',

                        }
                    )

                if not user[0].otp == otp:
                        return Response(
                        {
                            'status' : 400,
                            'message' : 'Somethimg went wrong',
                            'data': 'wrong otp',

                        }
                    )

                user = user.first()
                user.is_verfied = True
                user.save()
                token = get_tokens_for_user(user)
                return Response(
                            {
                                'token':token,
                                'status' : 200,
                                'data' : 'Acount Verified now search your bus',
                            }
                    )


            return Response(
                    {
                        'status' : 400,
                        'message' : 'Somethimg went wrong',
                        'data': 'wrong otp',

                    }
                )

        except Exception as w:
            return Response(str(w))       





class ConfirmSeatsBooking(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        try:
            userid = request.user.id
            print("userid>>>",userid)
            return Response ({'msg' :'seat booked'}, status=status.HTTP_201_CREATED)
        except Exception as e :
            return Response({str(e)}, status=status.HTTP_400_BAD_REQUEST)