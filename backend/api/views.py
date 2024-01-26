from django.shortcuts import render
from .models import User, Profile
from .serializers import UserSerializer, RegisterSerializer, NewTokenObtainPairSerializer

from rest_framework import generics, status
from rest_framework import permissions

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView

class NewTokenObtainPairView(TokenObtainPairView):
  serializer_class = NewTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = RegisterSerializer


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def dashboard(request):
  if request.method == 'GET':
    response = f"Hello {request.user}, this is GET Response"
    return Response({"response": response}, status=status.HTTP_200_OK)

  elif request.method == 'POST':
    text = request.POST.get("text")
    response = f"Hello {request.user}, this is POST Response and the text is {text}"
    return Response({"response": response}, status=status.HTTP_200_OK)
  return Response({}, status=status.HTTP_400_BAD_REQUEST)

    
