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

    #register


    #view all events
    path('events/display/', DisplayEvent.as_view({'get': 'list'}), name='view_events'),
    path('events/display/<int:pk>/', DisplayEvent.as_view({'get': 'retrieve'}), name='view_eventdeets'),
    path('events/display/<int:pk>/', DispDelEvent.as_view({'delete': 'delete'}), name='view_eventdeets'),

    #view approved events
    path('events/display/student/', DisplayEventStudentApproved.as_view({'get': 'list'}), name='view_approved_events'),
    path('events/display/student/rejected/', DisplayEventStudentRejected.as_view({'get': 'list'}), name='view_rejected_events'),
    path('events/display/student/pending/', DisplayEventStudentPending.as_view({'post': 'list'}), name='view_pending_events'),
    path('events/display/student/previous/', DisplayEventStudentPrevious.as_view({'get': 'list'}), name='view_previous_events'),
    path('events/display/student/<int:pk>/', DisplayEventStudentApproved.as_view({'get': 'retrieve'}), name='view_approved_eventdeets'),

    #view pending bookings all
    path('booking/display/', DisplayBookingsPending.as_view({'get' : 'list'}), name='view_bookings'),


    #view committees
    path('committee/display/', DisplayCommittee.as_view({'get': 'list'}), name='view_committees'),
    path('committee/display/<str:pk>/', DisplayCommittee.as_view({'get': 'retrieve'}), name='view_committeedeets'),

    #view students
    path('students/display/', DisplayStudent.as_view({'get': 'list'}), name='view_students'),
    path('students/display/<str:pk>/', DisplayStudent.as_view({'get': 'retrieve'}), name='view_studentdeets'),
    path('students/register/', Registration.as_view(), name='register'),

    #view faculty
    path('faculty/display/', DisplayFaculty.as_view({'get': 'list'}), name='view_faculty'),
    path('faculty/display/<str:pk>/', DisplayFaculty.as_view({'get': 'retrieve'}), name='view_facultydeets'),

    #view venue
    path('venue/display/', DisplayVenue.as_view({'get': 'list'}), name='view_venues'),
    path('venue/display/<str:pk>/', DisplayVenue.as_view({'get': 'retrieve'}), name='view_venuedeets'),
    path('venue/available/', VenueAvailable.as_view(), name='view_venues_available'),

]

