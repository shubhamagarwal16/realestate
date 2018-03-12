from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from . import serializers
# import json

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class StateAPIView(APIView):

    def get(self, request):        
        statelist = [ {'id': state.id, 'name': state.name} for state in StateList.objects.all().order_by('name')]
        return Response({ 'statelist': statelist })

class CityAPIView(APIView):

    def get(self, request, stateId):
        if stateId:        
            citylist = [ {'id': city.id, 'name': city.name} for city in CityList.objects.filter( state_id = stateId ).order_by('name')]
            return Response({ 'citylist': citylist })
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)