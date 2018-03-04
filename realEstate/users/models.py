from django.db import models

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

# Create your models here.

# class Users(models.Model):
#     fullName = models.CharField(max_length=500, default="Shubham Agarwal")
#     email = models.EmailField(max_length=254)
#     phoneNo = models.IntegerField()
#     password = models.CharField(max_length=500, default="password")
#     userType = models.IntegerField(default=1)

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
        return self.email


