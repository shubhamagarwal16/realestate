from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User

import json
# Create your views here.

from .models import *;

def index(request):
    return HttpResponse('working');

def userLogin(request):
    if request.method == 'POST':
        # data = json.loads(request.body)
        # return JsonResponse(data);
        email = request.POST['emailPhno']
        password = request.POST['loginPassword']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('- working -')
        else:
            return HttpResponse('invalid')
    else:
        return HttpResponse('-- invalid POST request --')

def addUser(request):
    newUser = User.objects.create_user(username = '', email = 'shivam2@gmail.com', password = 'zxc')
    # newUser = Users(email="testing@gmail.com", phoneNo=1234567851)
    # newUser.set_password('testing')
    newUser.save()
    return HttpResponse('-- addUser  --')

def allUsers(request):
    allUsers = User.objects.all()
    return HttpResponse(allUsers)