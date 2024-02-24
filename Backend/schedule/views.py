from django.shortcuts import render

# Create your views here.


from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from schedule.serializers import *
from base.models import *

# Create your views here.


class createEvent(APIView):
    def post(self, request):
        serializer = EventsSerializer(data=request.data)
        serializer.committee=Committee.objects.filter(name=request.data["committee_name"])
        serializer.venue=Venue.objects.filter(name=request.data["venue_name"])

        event_name = request.data.get('name')
        if serializer.is_valid():
            try:
                serializer.save()
                principle = Faculty.objects.get(is_principle=True)
                hod = Faculty.objects.get(is_hod=True)
                mentor = Faculty.objects.get(is_mentor=True)
                dean = Faculty.objects.get(is_dean=True)
                email_send(principle.email, principle.fac_id, event_name, request.data)
                email_send(hod.email, hod.fac_id, event_name, request.data)
                email_send(mentor.email, mentor.fac_id, event_name, request.data)
                email_send(dean.email, dean.fac_id, event_name, request.data)
                return Response({'message' : "Event booked successfully"})
            except Exception as e:
                print(f'errors : {e}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Sending approval email
def email_send(email, fac_id, event_name, event_data):
    subject = 'click the link to approve the event'
    message = f'{event_data}\nClick on the link to approve this event http://127.0.0.1:8000/events/approval/{event_name}/{fac_id}/'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)


# Verifying the email
def email_approval(request, event, fac_id):
    fac = get_object_or_404(Faculty, key=fac_id)
    faculty = fac.email
    
    faculty_obj = Faculty.objects.get(email=faculty)
    event_obj = Event.objects.get(name=event)
    booking = Booking.objects.get(event=event_obj)

    if faculty_obj.is_principle == True:
        if not booking.is_approved_pri:
            event_obj.is_approved_pri = True
            event_obj.save()
            return JsonResponse({'message' : 'Approved by principle'})
    
    if faculty_obj.is_hod == True:
        if not booking.is_approved_hod:
            event_obj.is_approved_hod = True
            event_obj.save()
            return JsonResponse({'message' : 'Approved by hod'})

    if faculty_obj.is_mentor == True:
        if not booking.is_approved_mentor:
            event_obj.is_approved_mentor = True
            event_obj.save()
            return JsonResponse({'message' : 'Approved by mentor'})
        
    if faculty_obj.is_dean == True:
        if not booking.is_approved_dean:
            event_obj.is_approved_dean = True
            event_obj.save()
            return JsonResponse({'message' : 'Approved by dean'})
    
    # if not faculty_obj.is_verified:
    #     user_obj.is_verified = True
    #     user_obj.save()
    #     print(user_obj)
    #     return JsonResponse({'message' : 'verified'})
    return JsonResponse({'message' : 'Event is already approved'})

