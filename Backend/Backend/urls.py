from django.contrib import admin
from django.urls import path,include
from schedule.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),
    path('events/', createEvent.as_view(), name='create_event'),
    path('events/approval/<str:name>/<str:fac_id>/', email_approval, name='create_event'),
    path('events/display/', DisplayEvent.as_view({'get': 'list'}), name='view_events'),
    path('events/display/<str:name>/', DisplayEvent.as_view({'get': 'retrieve'}), name='view_eventdeets'),
    path('events/display/student/', DisplayEventStudent.as_view({'get': 'list'}), name='view_approved_events'),
    path('events/display/student/<str:name>/', DisplayEventStudent.as_view({'get': 'retrieve'}), name='view_approved_eventdeets'),
    path('committee/display/', DisplayCommittee.as_view({'get': 'list'}), name='view_committees'),
    path('committee/display/<str:pk>/', DisplayCommittee.as_view({'get': 'retrieve'}), name='view_committeedeets'),
    path('students/display/', DisplayStudent.as_view({'get': 'list'}), name='view_students'),
    path('students/display/<str:pk>/', DisplayStudent.as_view({'get': 'retrieve'}), name='view_studentdeets'),
    path('faculty/display/', DisplayFaculty.as_view({'get': 'list'}), name='view_faculty'),
    path('faculty/display/<str:pk>/', DisplayFaculty.as_view({'get': 'retrieve'}), name='view_facultydeets'),
    path('venue/display/', DisplayVenue.as_view({'get': 'list'}), name='view_venues'),
    path('venue/display/<str:pk>/', DisplayVenue.as_view({'get': 'retrieve'}), name='view_venuedeets'),
]

