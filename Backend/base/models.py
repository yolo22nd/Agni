from django.db import models

# Create your models here.


# class User(models.)

class Committee(models.Model):
    name = models.CharField(max_length=100, unique=True)
    department = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    desc = models.TextField(max_length=500)


class Student(models.Model):
    name = models.CharField(max_length=100, unique=True)
    department = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    rollno = models.CharField(max_length=20)
    ac_year = models.IntegerField()


class Faculty(models.Model):
    name = models.CharField(max_length=100, unique=True)
    department = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    fac_id = models.CharField(max_length=20)
    is_principle = models.BooleanField()
    is_hod = models.BooleanField()
    is_mentor = models.BooleanField()
    is_dean = models.BooleanField()