from django.shortcuts import render

from userauths.models import Profile, User
from userauths.serializer import MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

# Si no se coloca ese atributo, no se puede acceder a la vista
# generando el siguiente error: AttributeError: type object 'MyTokenObtainPairView' has no attribute 'as_view' 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer