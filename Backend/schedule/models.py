from django.db import models

# Create your models here.


class Venue(models.Model):
    name = models.CharField(max_length=20, unique=True)
    capacity = models.IntegerField()
    address = models.TextField(max_length=500)
    # event = models.ForeignKey('Event', on_delete=models.CASCADE, null=False, blank=False)


class Booking(models.Model):
    is_available = models.BooleanField(null=False, blank=False, default=True)
    date = models.DateField()
    committee = models.ForeignKey('accounts.Committee', on_delete=models.CASCADE, blank=False, null=False)
    venue = models.ForeignKey('Venue', on_delete=models.CASCADE, blank=False, null=False)
    is_approved_all = models.BooleanField(default=False)
    is_approved_pri = models.BooleanField(default=False)
    is_approved_mentor = models.BooleanField(default=False)
    is_approved_dean = models.BooleanField(default=False)
    is_approved_hod = models.BooleanField(default=False)


class Event(models.Model):
    ENTERTAINMENT = 'entertainment'
    EDUCATION = 'education'

    EVENT_TYPES = [
        (ENTERTAINMENT, 'entertainment'),
        (EDUCATION, 'education')
    ]
    name = models.CharField(max_length=200, unique=True)
    committee = models.ForeignKey('accounts.Committee', on_delete=models.CASCADE, blank=False, null=False)
    booking = models.ForeignKey('Booking', on_delete=models.CASCADE, blank=False, null=False)
    venue = models.ForeignKey('Venue', on_delete=models.CASCADE, blank=False, null=False)
    regi_members = models.IntegerField()
    type = models.CharField(max_length=50, blank=False, null=False, choices=EVENT_TYPES)
    desc = models.TextField(max_length=1000)
    date = models.DateField(blank=False, null=False)
    time =  models.TimeField(blank=False, null=False)
    

    