from django.db import models
from django.contrib.auth.models import User

class Committee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True, primary_key=True)
    department = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    desc = models.TextField(max_length=500)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    department = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    rollno = models.CharField(max_length=20, primary_key=True)
    ac_year = models.IntegerField()

class Faculty(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    department = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    fac_id = models.CharField(max_length=20, unique=True, primary_key=True)
    is_principle = models.BooleanField()
    is_hod = models.BooleanField()
    is_mentor = models.BooleanField()
    is_dean = models.BooleanField()
