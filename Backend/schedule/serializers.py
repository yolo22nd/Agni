from rest_framework import serializers
from base.models import *
from .models import *


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        # fields = ['name', 'type', 'date', 'time', 'desc', 'image']
        fields = '__all__'

        # def create(self, validated_data):
        #     comm = self.context['request'].name
        #     committee = Committee.objects.get(name=comm)
        #     return Event.objects.create(committee=committee, **validated_data)

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        # fields = ['name', 'type', 'date', 'time', 'desc', 'image', 'committee', 'venue']
        fields = '__all__'

    # def save(self, **kwargs):
    #     instance = super().save(**kwargs)
    #     # Your custom logic here...
    #     return instance  # Make sure to return the instance


class EventSerializerAll(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class BookingSerializerAll(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'