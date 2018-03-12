
from django.urls import path, include
from . import views


urlpatterns = [
    path('statelist', views.StateAPIView.as_view(), name="statelist"),
    path('citylist/<int:stateId>/', views.CityAPIView.as_view(), name="citylist"),
]