from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response ##standard response object
from rest_framework import status

from . import serializers
from . import models


# Create your views here.

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

#TEST
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

class UsersViewSet(viewsets.ModelViewSet): 
    #ModelViewSet - special view set that takes care of updating, reading and creating items
    """Handles creating and updating profiles"""

    serializer_class = serializers.UsersSerializers
    queryset = models.Users.objects.all()



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