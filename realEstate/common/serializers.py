""" Best practice to store all serializers here """

from rest_framework import serializers
from . import models
from users.models import *

class CheckEmailAvailability(serializers.ModelSerializer):
    # email = serializers.CharField()

    class Meta:
        model = Users
        fields = ('email',)
        # fields = '__all__'   For all-


# class StateAPIView(serializers.ModelSerializer):

#     class Meta:  # Tells djano what fields we wana take from models
#         model = models.StateList
#         fields = ('id', 'name')

#     def get(self):
#         statelist = StateList.objects.all()
#         return statelist