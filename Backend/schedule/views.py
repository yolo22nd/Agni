from django.shortcuts import render
import base64

# Create your views here.


from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db.models import Q
from schedule.serializers import *
from base.models import *
from base.serializers import *
from base.api.views import *
from django.contrib.auth.hashers import check_password


# Create your views here.


class createEvent(APIView):
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        event_name = request.data.get('name')

        if serializer.is_valid():
            try:
                print("serializer valid")
                booking_obj = serializer.save()
                print(booking_obj)

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
def encrypt_name(name):
    encoded_bytes = base64.b64encode(name.encode('utf-8'))
    encoded_name = encoded_bytes.decode('utf-8')
    return encoded_name


def email_send(email, fac_id, event_name, event_data):
    subject = 'click the link to approve the event'
    # message = f'{event_data}\nClick on the link to approve this event http://127.0.0.1:8000/events/approval/{event_name}/{fac_id}/'
    encoded_data = encrypt_name(fac_id+"+"+event_name)
    message = f'{event_data}\nClick on the link to approve this event http://localhost:3000/form/{encoded_data}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from,recipient_list)


from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
def email_approval(request, encoded_data):
    decoded_bytes = base64.b64decode(encoded_data)
    decoded_str = decoded_bytes.decode('utf-8')
    fac_id, event_name = decoded_str.split('+')

    faculty_obj = get_object_or_404(Faculty, fac_id=fac_id)
    
    # Get the password from the request
    password = request.data.get('password')

    # Verify the password
    if not check_password(password, faculty_obj.user.password):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    booking_obj = Booking.objects.get(name=event_name)

    if faculty_obj.is_principle == True:
        if not booking_obj.is_approved_pri:
            booking_obj.is_approved_pri = True
            booking_obj.save()
            # return JsonResponse({'message' : 'Approved by principle'})

    if faculty_obj.is_hod == True:
        if not booking_obj.is_approved_hod:
            booking_obj.is_approved_hod = True
            booking_obj.save()
            # return JsonResponse({'message' : 'Approved by hod'})

    if faculty_obj.is_mentor == True:
        if not booking_obj.is_approved_mentor:
            booking_obj.is_approved_mentor = True
            booking_obj.save()
            # return JsonResponse({'message' : 'Approved by mentor'})
        
    if faculty_obj.is_dean == True:
        if not booking_obj.is_approved_dean:
            booking_obj.is_approved_dean = True
            booking_obj.save()
            # return JsonResponse({'message' : 'Approved by dean'})

    booking_obj.save()
    # Check if the booking is approved by all four types of faculties
    if booking_obj.is_approved_pri and booking_obj.is_approved_hod and booking_obj.is_approved_mentor and booking_obj.is_approved_dean:
        booking_obj.is_terminated = True
        booking_obj.is_approved_all = True

        # Create a new Event object
        event = Event.objects.create(name=event_name,committee=booking_obj.committee,venue=booking_obj.venue,type=booking_obj.type,desc=booking_obj.desc,date=booking_obj.date,time=booking_obj.time,image=booking_obj.image)
        event.save()

        # Send an email to the committee
        committee = Committee.objects.get(user=booking_obj.user)
        subject = 'Your event has been approved'
        message = f'Your event "{event_name}" has been approved by all the faculties and it is successfully scheduled. \n All the students can start with the registrations now.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [committee.email]
        send_mail(subject, message, email_from, recipient_list)

    return JsonResponse({'message' : 'Event approved successfully'})


@csrf_exempt
@api_view(['POST'])
def approval(request):
    fac_id = request.data.get('fac_id')
    event_name = request.data.get('event_name')

    faculty_obj = get_object_or_404(Faculty, fac_id=fac_id)
    booking_obj = Booking.objects.get(name=event_name)

    if faculty_obj.is_principle == True:
        if not booking_obj.is_approved_pri:
            booking_obj.is_approved_pri = True
            print("approved by pri")

    elif faculty_obj.is_hod == True:
        if not booking_obj.is_approved_hod:
            booking_obj.is_approved_hod = True
            print("approved by hod")

    elif faculty_obj.is_mentor == True:
        if not booking_obj.is_approved_mentor:
            booking_obj.is_approved_mentor = True
            print("approved by mentor")
        
    elif faculty_obj.is_dean == True:
        if not booking_obj.is_approved_dean:
            booking_obj.is_approved_dean = True
            print("approved by dean")

    booking_obj.save()

    # Check if the booking is approved by all four types of faculties
    if booking_obj.is_approved_pri and booking_obj.is_approved_hod and booking_obj.is_approved_mentor and booking_obj.is_approved_dean:
        booking_obj.is_terminated = True
        booking_obj.is_approved_all = True
        booking_obj.save()

        # Create a new Event object
        committee = Committee.objects.get(name=booking_obj.committee.name)
        event = Event.objects.create(name=event_name,committee=booking_obj.committee,venue=booking_obj.venue,type=booking_obj.type,desc=booking_obj.desc,date=booking_obj.date,time=booking_obj.time,image=booking_obj.image)
        event.save()

        # Send an email to the committee
        subject = 'Your event has been approved'
        message = f'Your event "{event_name}" has been approved by all the faculties and it is successfully scheduled. \n All the students can start with the registrations now.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [committee.email]
        send_mail(subject, message, email_from, recipient_list)
        # send_mail("this is subject","this is message",email_from,[committee.email])

    return JsonResponse({'message' : 'Event approved successfully'})


@csrf_exempt
@api_view(['POST'])
def rejection(request):
    fac_id = request.data.get('fac_id')
    event_name = request.data.get('event_name')
    password = request.data.get('password')

    faculty_obj = get_object_or_404(Faculty, fac_id=fac_id)

    # Verify the password
    if not check_password(password, faculty_obj.user.password):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    booking_obj = Booking.objects.get(name=event_name)

    # Set isTerminated to True and is_approved_all to False
    booking_obj.is_terminated = True
    booking_obj.is_approved_all = False
    booking_obj.save()

    # Send an email to the committee
    committee = Committee.objects.get(user=booking_obj.user)
    subject = 'Your event has been cancelled'
    message = f'Unfortunately, your event "{event_name}" has been cancelled. You may take it up with your respective faculties.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [committee.email]
    send_mail(subject, message, email_from, recipient_list)

    return JsonResponse({'message' : 'Event cancelled successfully'})



# class DisplayEventStudentApproved(viewsets.ModelViewSet):
#     queryset = Booking.objects.filter(is_terminated=True, is_approved_all=True)
#     serializer_class = BookingSerializerAll

# class DisplayEventStudentRejected(viewsets.ModelViewSet):
#     queryset = Booking.objects.filter(is_terminated=True, is_approved_all=False)
#     serializer_class = BookingSerializerAll

# class DisplayEventStudentPrevious(viewsets.ModelViewSet):
#     queryset = Event.objects.filter(Q(is_approved=True) | Q(is_rejected=True), date__lt=timezone.now())
#     serializer_class = EventSerializerAll


#Committee Approved
class DisplayEventStudentApproved(APIView):
    def post(self, request):
        committee_obj = Committee.objects.get(name=request.data.get('name'))
        events = Event.objects.filter(committee=committee_obj.name)
        serialized_events = EventSerializerAll(events, many=True)
        return Response(serialized_events.data, status=status.HTTP_200_OK)

#Committee Rejected
class DisplayEventStudentRejected(APIView):
    def post(self, request):
        committee_obj = Committee.objects.get(name=request.data.get('name'))
        events = Booking.objects.filter(committee=committee_obj.name, is_approved_all=False, is_terminated=True)
        serialized_events = BookingSerializerAll(events, many=True)
        return Response(serialized_events.data, status=status.HTTP_200_OK)

#Committee Pending
class DisplayEventStudentPending(APIView):
    def post(self, request):
        committee_obj = Committee.objects.get(name=request.data.get('name'))
        events = Booking.objects.filter(committee=committee_obj.name, is_terminated=False)
        serialized_events = BookingSerializerAll(events, many=True)
        return Response(serialized_events.data, status=status.HTTP_200_OK)
    
#all events
class allEvents(APIView):
    def post(self, request):
        events = Event.objects.all()
        serialized_events = BookingSerializerAll(events, many=True)
        return Response(serialized_events.data, status=status.HTTP_200_OK)
    


#Faculty Previous
class DisplayBookingsPrevious(viewsets.ModelViewSet):
    queryset = Booking.objects.filter(is_approved_pri=True,is_approved_dean=True,is_approved_hod=True,is_approved_mentor=True)
    serializer_class = BookingSerializerAll


# Faculty Pending
class DisplayEventStudentPendingFac(viewsets.ViewSet):
    serializer_class = BookingSerializer  # Change this to your Booking serializer

    def list(self, request):
        fac_id = request.data.get('fac_id')

        try:
            faculty_obj = Faculty.objects.get(fac_id=fac_id)

            booking_list = []

            if faculty_obj.is_principle:
                booking_list = Booking.objects.filter(is_approved_pri=False)
            elif faculty_obj.is_hod:
                booking_list = Booking.objects.filter(is_approved_hod=False)
            elif faculty_obj.is_mentor:
                booking_list = Booking.objects.filter(is_approved_mentor=False)
            elif faculty_obj.is_dean:
                booking_list = Booking.objects.filter(is_approved_dean=False)

            # Serialize the bookings
            serializer = self.serializer_class(booking_list, many=True)
            return Response({'booking_list': serializer.data})
        except (Faculty.DoesNotExist, Booking.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    queryset = Booking.objects.all()  # Change this to your Booking queryset
    serializer_class = BookingSerializer  # Change this to your Booking serializer


class DisplayEvent(APIView):
    def post(self, request):
        # Get the date from the request body
        date = request.data.get('date')

        # Find all booking objects having the same date
        bookings = Booking.objects.filter(date=date)

        # Serialize the booking objects
        serialized_bookings = BookingSerializer(bookings, many=True)

        # Return the serialized booking objects
        return Response(serialized_bookings.data, status=status.HTTP_200_OK)

class DisplayEventDetails(APIView):
    def get(self, request, pk, format=None):
        event = get_object_or_404(Booking, pk=pk)
        serializer = BookingSerializer(event)
        return Response(serializer.data)

from rest_framework import generics

class DispDelEvent(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class DisplayCommittee(viewsets.ModelViewSet):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer

   
class DisplayStudent(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class DisplayFaculty(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

    
class DisplayVenue(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer


class Registration(APIView):
    def post(self, request):
        try:
            new_member_rollno = request.data.get('rollno')
            event_id = request.data.get('event_id')
            event_obj = Event.objects.get(id=event_id)
            student_obj = Student.objects.get(rollno=new_member_rollno)
            existing_members = event_obj.regi_members

            if existing_members:
                updated_members = f"{existing_members}, {new_member_rollno}"
            else:
                updated_members = new_member_rollno

            event_obj.regi_members = updated_members
            event_obj.save()
            subject = f'{event_obj.name} Registration'
            message = f'You are registered for {event_obj.name} successfully\nFollowing are the details of the event\n{event_obj}'
            student_email = student_obj.email
            email_from = settings.EMAIL_HOST_USER
            send_mail(subject, message, email_from, [student_email])
            return JsonResponse({'message': 'Member registered successfully'}, status=status.HTTP_201_CREATED)
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class VenueAvailable(APIView):
    def post(self, request):
        date = request.data.get('date')

        available_venues = Venue.objects.filter(is_available=True)
        serialized_venues = VenueSerializer(available_venues, many=True).data

        unavailable_venues = Venue.objects.filter(is_available=False)
        serialized_unavailable_venues = VenueSerializer(unavailable_venues,many=True).data

        # class DisplayVenue(viewsets.ModelViewSet):
        # queryset = Venue.objects.all()
        # serializer_class = VenueSerializer

        return JsonResponse({"available_venues": serialized_venues,"unavailable_venues":serialized_unavailable_venues})


class RegisteredStudents(APIView):
    def post(self, request):
        event_obj = Event.objects.get(name=request.data.get('name'))
        registered_students_ids = event_obj.regi_members.split(', ')

        # Convert the list of ids to integers
        # registered_students_ids = [int(id) for id in registered_students_ids]

        # Get the Student objects for the registered students
        registered_students = Student.objects.filter(rollno__in=registered_students_ids)

        # Serialize the Student objects
        serializer = StudentSerializer(registered_students, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
