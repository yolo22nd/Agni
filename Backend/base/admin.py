from django.contrib import admin
from .models import *

# Register your models here.


class CommitteeAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'department', 'desc'] 

admin.site.register(Committee, CommitteeAdmin)