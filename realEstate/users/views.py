from django.shortcuts import render
from django.contrib.auth import authenticate

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response ##standard response object
from rest_framework import status
#from rest_framework import HTTP_401_UNAUTHORIZED, HTTP_200_OK
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from . import serializers
from . import models
from . import permissions
import json

# Create your views here.

# ------- Login ViewSet
# class LoginViewSet(viewsets.ViewSet):
#     """ Check email and password and returns an auth token"""

#     serializer_class = AuthTokenSerializer

#     def create(self, request):
#         """User the ObtainAuthToken APIView to validate and create a token """
        
#         # return ObtainAuthToken().post(request)
#         # return Response({ 'data': json.dumps(ObtainAuthToken().post(request)) })
#         return Response({ 'data': 'test' })

# ------- Login APIView
class LoginAPIView(APIView):
    """ Check email and password and returns an auth token"""

    serializer_class = AuthTokenSerializer
    def get(self, request):
        return Response({ 'data': 'GET' })

    def post(self, request):
        """User the ObtainAuthToken APIView to validate and create a token """
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Login failed"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # token = Token.objects.create
            token = ObtainAuthToken().post(request)
            # Returning the Auth token if login is successful
            return token 
            # return Response({ 'status': 'success', 'token': token.token }, status = status.HTTP_200_OK)
        

# -------- MAIN
class UsersViewSet(viewsets.ModelViewSet): 
    #ModelViewSet - special view set that takes care of updating, reading and creating items
    """Handles creating and updating profiles"""

    serializer_class = serializers.UsersSerializers
    queryset = models.Users.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)

# -------------------------- APIView TEST-----------------------------
class realEstateAPI(APIView):

    def get(self, request, format=None):
        """Return a list of APIView features """

        serializer_class = serializers.RealSerializers

        an_apiview = [
            'Uses HTTP methods as functions',
            'similar to traditional Django Views'
        ]

        return Response({ 'message': 'Hello!', 'an_apiview': an_apiview })

    def post(self, request):
        serializer = serializers.RealSerializers(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            message = 'Hello {0}'.format(name)
            #message = 'Hello {0}'.format(name)
            return Response({ 'message': message })
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        """ Updation """

        return Response({'method':'put'})

    def patch(self, request, pk=None):
        """Patch request, only updates fields provided in the request """
        return Response({'method':'patch'})

    def delete(self, request, pk=None):
        """ Deletes an object """
        return Response({'method':'delete'})

# -----------------TEST
class HelloViewSet(viewsets.ViewSet):
    """Test API Viewset """

    serializer_class = serializers.RealSerializers

    def list(self, request):
        """Return a hello message"""
        a_viewset = [
            'User Actions (list, create, retrieve, update, partial_update)',
            'Automatically maps to urls using routers',
            'Provides more functionality with less code'
        ]

        return Response({ 'message': 'Hello', 'a_viewset': a_viewset })
    
    def create(self, request):
        """Create a new hello message """
         
        serializer = serializers.RealSerializers(data = request.data)
         
        if serializer.is_valid():
            name = serializer.data.get('name')
            message = 'Hello {0}'.format(name)
            return Response({ 'message': message })
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        """Handling getting an object by its ID"""
        
        return Response({'http_mehod': 'GET'})

    def update(self, request, pk=None):
        """Handling updating an object"""

        return Response({'http_mehod': 'PUT'})

    def partial_update(self, request, pk=None):
        """Handling updating part of an object"""

        return Response({'http_mehod': 'PATCH'})

    def destroy(self, request, pk=None):
        """Handling removing part of an object"""

        return Response({'http_mehod': 'DELETE'})

# from django.http import HttpResponse, JsonResponse
# from django.contrib.auth.models import User

# import json

# from .models import *;

# def index(request):
#     return HttpResponse('working');

# def userLogin(request):
#     if request.method == 'POST':
#         # data = json.loads(request.body)
#         # return JsonResponse(data);
#         email = request.POST['emailPhno']
#         password = request.POST['loginPassword']
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return HttpResponse('- working -')
#         else:
#             return HttpResponse('invalid')
#     else:
#         return HttpResponse('-- invalid POST request --')

# def addUser(request):
#     newUser = User.objects.create_user(username = '', email = 'shivam2@gmail.com', password = 'zxc')
#     # newUser = Users(email="testing@gmail.com", phoneNo=1234567851)
#     # newUser.set_password('testing')
#     newUser.save()
#     return HttpResponse('-- addUser  --')

# def allUsers(request):
#     allUsers = User.objects.all()
#     return HttpResponse(allUsers)