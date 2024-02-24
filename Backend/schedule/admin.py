from django.contrib import admin
from .models import *

# Register your models here.


class VenueAdmin(admin.ModelAdmin):
    list_display = ['name', 'capacity', 'address', 'is_available', 'image'] 


class BookingAdmin(admin.ModelAdmin):
    list_display = ['is_approved_all', 'venue', 'committee', 'date'] 


class EventAdmin(admin.ModelAdmin):
    list_display = ['name', 'committee', 'booking', 'venue', 'date', 'time', 'image'] 


admin.site.register(Venue, VenueAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Event, EventAdmin)