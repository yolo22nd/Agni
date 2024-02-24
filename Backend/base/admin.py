from django.contrib import admin
from .models import *

# Register your models here.


# class CommitteeAdmin(admin.ModelAdmin):
#     list_display = ['name', 'email', 'department', 'desc'] 


# class StudentAdmin(admin.ModelAdmin):
#     list_display = ['name', 'email', 'department', 'rollno','ac_year'] 


# class FacultyAdmin(admin.ModelAdmin):
#     list_display = ['name', 'email', 'department', 'fac_id', 'is_principle', 'is_hod','is_mentor','is_dean'] 



admin.site.register(Committee)
admin.site.register(Student)
admin.site.register(Faculty)