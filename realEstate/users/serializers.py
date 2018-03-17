""" Best practice to store all serializers here """

from rest_framework import serializers
from . import models

class RealSerializers(serializers.Serializer):
    name = serializers.CharField(max_length=10)

class UsersSerializers(serializers.ModelSerializer):
    """ Serializers for user profiles """

    class Meta:  # Tells django what fields we wana take from models
        model = models.Users
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = { 'password': { 'write_only': True } }

    def create(self, validated_data):
        """ Creates and returns a new user """

        user = models.Users(
            email = validated_data['email'],
            name = validated_data['fName'] + ' ' + validated_data['lName']
        )

        user.set_password(validated_data['password'])
        user.save()

        # return user
        return Users.objects.latest('id')

class UsersDataSerializers(serializers.ModelSerializer):
    """ Serializers for user's additional data """
    user_id = UsersSerializers(many = True)

    class Meta:  # Tells djano what fields we wana take from models
        model = models.UsersData
        fields = ('id', 'user_id', 'phoneNo', 'state', 'city', 'pincode', 'user_type')
        # extra_kwargs = { 'password': { 'write_only': True } }
    
    def create(self, validated_data):
        """ Creates and returns a new user """

        userData = models.UsersData(
            user_id = validated_data.pop('user_id'),
            phoneNo = int(validated_data['phoneNo']),
            state = validated_data['state'],
            city = validated_data['city'],
            pincode = validated_data['pinCode'],
            user_type = validated_data['userType']
        )

        userData.save()

        return userData

        
# TEST
# class UsersSerializers(serializers.ModelSerializer):
#     """ Serializers for user profiles """

#     class Meta:  # Tells djano what fields we wana take from models
#         model = models.Users
#         fields = ('id', 'email', 'name', 'password')
#         extra_kwargs = { 'password': { 'write_only': True } }

#     def create(self, validated_data):
#         """ Creates and returns a new user """

#         user = models.Users(
#             email = validated_data['email'],
#             name = validated_data['name']
#         )

#         user.set_password(validated_data['password'])
#         user.save()

#         return user


