from django.contrib import admin
from django.urls import path,include
from schedule.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),

    #create event
    path('events/', createEvent.as_view(), name='create_event'),

    #send email
    path('events/approval/<str:event>/<str:fac_id>/', email_approval, name='create_event'),

    #view all events
    path('events/display/', DisplayEvent.as_view({'get': 'list'}), name='view_events'),
    path('events/display/<int:pk>/', DisplayEvent.as_view({'get': 'retrieve'}), name='view_eventdeets'),

    #view approved events
    path('events/display/student/', DisplayEventStudent.as_view({'get': 'list'}), name='view_approved_events'),
    path('events/display/student/<int:pk>/', DisplayEventStudent.as_view({'get': 'retrieve'}), name='view_approved_eventdeets'),

    #view committees
    path('committee/display/', DisplayCommittee.as_view({'get': 'list'}), name='view_committees'),
    path('committee/display/<str:pk>/', DisplayCommittee.as_view({'get': 'retrieve'}), name='view_committeedeets'),

    #view students
    path('students/display/', DisplayStudent.as_view({'get': 'list'}), name='view_students'),
    path('students/display/<str:pk>/', DisplayStudent.as_view({'get': 'retrieve'}), name='view_studentdeets'),

    #view faculty
    path('faculty/display/', DisplayFaculty.as_view({'get': 'list'}), name='view_faculty'),
    path('faculty/display/<str:pk>/', DisplayFaculty.as_view({'get': 'retrieve'}), name='view_facultydeets'),

    #view venue
    path('venue/display/', DisplayVenue.as_view({'get': 'list'}), name='view_venues'),
    path('venue/display/<str:pk>/', DisplayVenue.as_view({'get': 'retrieve'}), name='view_venuedeets'),
]

