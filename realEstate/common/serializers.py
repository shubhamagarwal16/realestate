""" Best practice to store all serializers here """

from rest_framework import serializers
from . import models

# class StateAPIView(serializers.ModelSerializer):

#     class Meta:  # Tells djano what fields we wana take from models
#         model = models.StateList
#         fields = ('id', 'name')

#     def get(self):
#         statelist = StateList.objects.all()
#         return statelist