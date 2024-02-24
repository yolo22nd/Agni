from django.contrib import admin
from django.urls import path,include
from schedule.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),
    path('events/', createEvent.as_view(), name='create_event'),
    path('events/approval/<str:name>/<str:fac_id>/', email_approval, name='create_event')
]

