from rest_framework import serializers
from base.models import *
from .models import *

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'type', 'date', 'time', 'desc', 'image']

        # def create(self, validated_data):
        #     comm = self.context['request'].name
        #     committee = Committee.objects.get(name=comm)
        #     return Event.objects.create(committee=committee, **validated_data)