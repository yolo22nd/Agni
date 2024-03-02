from django.contrib import admin
from django.urls import path,include
from schedule.views import *
from schedule import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),

    #create event
    path('events/', createEvent.as_view(), name='create_event'),

    #send email
    path('events/approval/<str:event>/<str:fac_id>/', email_approval, name='create_event'),

    #register


    #view all events
path('events/display/', DisplayEvent.as_view(), name='view_events'),
path('events/display/details/<int:pk>/', DisplayEventDetails.as_view(), name='view_eventdeets'),
path('events/display/delete/<int:pk>/', DispDelEvent.as_view(), name='delete_event'),

    #committee page
    path('events/display/student/rejected/', DisplayEventStudentRejected.as_view(), name='view_rejected_events'),
    path('events/display/student/', DisplayEventStudentApproved.as_view(), name='view_approved_events'),
    path('events/display/student/<int:pk>/', DisplayEventStudentApproved.as_view(), name='view_approved_eventdeets'),
    path('booking/display/pending', DisplayEventStudentPending.as_view(), name='view_bookings'),
    

    #faculty page
    path('events/display/student/pending/', DisplayEventStudentPendingFac.as_view({'post': 'list'}), name='view_pending_events'),
    path('booking/display/', DisplayBookingsPrevious.as_view({'get' : 'list'}), name='view_bookings'),
    # path('events/display/student/previous/', DisplayEventStudentPrevious.as_view({'get': 'list'}), name='view_previous_events'),

    #view pending bookings all


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


    # students registered for event
    path('committee/regi_students/', RegisteredStudents.as_view({'get': 'list'}), name='view_venues'),
    #email approval
    path('approve/<str:encoded_data>/', views.email_approval, name='email_approval'),

    #faculty approval and rejection
    path('approve/', views.approval, name='approval'),
    path('reject/', views.rejection, name='rejection'),
]

