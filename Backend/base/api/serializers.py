from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Committee, Student, Faculty

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


class CommitteeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Committee
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = '__all__'

class FacultySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Faculty
        fields = '__all__'