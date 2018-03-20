from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.Users)
admin.site.register(models.UsersData)