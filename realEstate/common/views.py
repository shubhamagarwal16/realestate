from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from users.models import Users
# import json

from . import serializers
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class StateAPIView(APIView):

    def get(self, request):        
        statelist = [ {'id': state.id, 'name': state.name} for state in StateList.objects.filter(is_active = True).order_by('name')]
        return Response({ 'statelist': statelist })

class CityAPIView(APIView):

    def get(self, request, stateId):
        if stateId:        
            citylist = [ {'id': city.id, 'name': city.name} for city in CityList.objects.filter( state_id = stateId, is_active = True ).order_by('name')]
            return Response({ 'citylist': citylist })
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CheckEmailAvailability(APIView):


    def get(self, request):
        if request.method == 'GET':         
            # return Response({'data': request.GET['email'] })   
            status = Users.objects.filter(email = request.GET['email'])
            serializer_class = serializers.CheckEmailAvailability(status, many=True)#(data = status, many=True)
            return Response({ 'status': serializer_class.data}) #, 'errors': serializer_class.errors 
        #     if serializer_class.is_valid():
        #         # return HttpResponse(serializer_class.data);
        #         return Response({ 'status': serializer_class.data })
        #     return Response({ 'errors': serializer_class.errors, 'as': 'as' })
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

    # def post(self, request):
    #     if request.method == 'POST':
    #         return Response({ 'status': request.data })
        #     status = Users.objects.filter(email = email)
        #     return Response({ 'status': status })
        # else:
        #     return Response(status=status.HTTP_400_BAD_REQUEST) 