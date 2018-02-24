# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def index(response):
    return HttpResponse('Working');

@csrf_exempt
def userLogin(request):
    if request.method == 'POST':
        received_json_data=json.loads(request.body)

        return  JsonResponse(received_json_data); #HttpResponse( data);
    else:
        return HttpResponse('else');