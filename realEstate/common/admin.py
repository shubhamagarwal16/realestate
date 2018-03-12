from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.StateList)
admin.site.register(models.CityList)