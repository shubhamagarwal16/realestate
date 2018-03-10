""" Best practice to store all serializers here """

from rest_framework import serializers
from . import models

class RealSerializers(serializers.Serializer):
    name = serializers.CharField(max_length=10)

class UsersSerializers(serializers.ModelSerializer):
    """ Serializers for user profiles """

    class Meta:  # Tells djano what fields we wana take from models
        model = models.Users
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = { 'password': { 'write_only': True } }

    def create(self, validated_data):
        """ Creates and returns a new user """

        user = models.Users(
            email = validated_data['email'],
            name = validated_data['name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


