from django.db import models
from common.models import *

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# from django.contrib.auth.models import PermissionsMixin
# from django.contrib.auth.models import BaseUserManager

# Create your models here.

class UsersManager(BaseUserManager):
    """Helps django with our custom user model"""

    def create_user(self, email, name, password=None):
        """Create a New user profile object"""
        if not email:
            raise ValueError('User must have an email addresss.')

        email = self.normalize_email(email) # fn that converts all caracters to lowercase

        user = self.model(email = email, name=name)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        """Create and saves a new superuser"""

        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class Users(AbstractBaseUser, PermissionsMixin):
    """Represent User profile inside out system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    # user_type = models.IntegerField(default=1)

    objects = UsersManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        """Used to get  a users full name"""
        return self.name
    
    def get_short_name(self):
        """Used to get a user's short name"""
        return self.name

    def __str__(self):
        """Used by django to convert object to string"""
        return self.name

class UsersData(models.Model):
    user_id = models.ForeignKey(Users, on_delete = models.CASCADE)
    phoneNo = models.CharField(max_length=10)
    state = models.ForeignKey(StateList, null=True, on_delete=models.SET_NULL, default=0)
    city = models.ForeignKey(CityList, null=True, on_delete=models.SET_NULL, default=0)
    pincode = models.IntegerField(default=0)
    user_type = models.IntegerField(default=1)
    slug = models.SlugField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.slug
