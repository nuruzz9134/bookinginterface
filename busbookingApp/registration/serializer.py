
from rest_framework import serializers
from registration.models import User
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator



class superuserSerializer(serializers.ModelSerializer):
    # we are writing this because we need confirm password2 field in our Registration Request
    password2 = serializers.CharField(style={'input_type' : 'password'},write_only=True)
    class Meta:
        model= User
        fields = ['email','password','password2']
        extra_kwargs = {'password' : {'write_only':True}    }


    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("password and confirm password does not match")
        return attrs

    def create(self, validated_data):
        return User.objects.create_superuser(**validated_data)



class UserRegistrationSerializer(serializers.ModelSerializer):
    # we are writing this because we need confirm password2 field in our Registration Request
    password2 = serializers.CharField(style={'input_type' : 'password'},write_only=True)
    class Meta:
        model= User
        fields = ['email','password','password2']
        extra_kwargs = {'password' : {'write_only':True}    }


    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("password and confirm password does not match")
        return attrs

    def create(self, validated_data):
         return User.objects.create_user(**validated_data)



class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=55)
    class Meta:
        model = User
        fields = ['email','password']



class VerifyAccountSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=55)
    otp = serializers.CharField(max_length=6)
    class Meta:
        model = User
        fields = ['email','otp']


