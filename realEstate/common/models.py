from django.db import models

# Create your models here.

class StateList(models.Model):
    name = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class CityList(models.Model):
    name = models.CharField(max_length=500)
    state = models.ForeignKey(StateList, default=0, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name