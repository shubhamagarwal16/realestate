# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.

def index(response):
    return HttpResponse('Working');

def userLogin(request, data=''):
    data = {
        'id': 4,
        'name': "test"
    }
    if request.method == 'POST':
        return  JsonResponse(data); #HttpResponse( data);
    else:
        return HttpResponse(request);