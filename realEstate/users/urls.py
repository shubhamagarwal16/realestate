"""realEstate   URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from . import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('hello-viewset', views.HelloViewSet, base_name="hello_viewset")
router.register('user', views.UsersViewSet)

urlpatterns = [
    path('test', views.realEstateAPI.as_view(), name="test"),
    path('', include(router.urls))
    # path('', views.index, name="index"),
    # path('user-login/', views.userLogin, name="user-login"),
    # path('add-user/', views.addUser, name="add-user"),
    # path('all-users/', views.allUsers, name="all-users"),
]
