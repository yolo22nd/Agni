from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from base.models import Student,Faculty, Committee
from base.models import Student, Faculty, Committee

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# from .serializers import MemeSerializer



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add standard claims
        token['username'] = user.username

        # Add custom claims
        if hasattr(user, 'student'):
            token['is_student'] = True
            token['student']= Student.objects.get(name=user.username)
        if hasattr(user, 'faculty'):
            token['is_faculty'] = True
            token['faculty']= Faculty.objects.get(name=user.username)
        if hasattr(user, 'committee'):
            token['is_committee'] = True
            token['committee']= Committee.objects.get(name=user.username)

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/token',
        '/api/token/refresh',
        
    ]

    return Response(routes)


# @api_view(['GET','POST'])
# @permission_classes([IsAuthenticated])
# def getMemes(request):
#     if request.method == 'GET':
#         user=request.user
#         memes = user.meme_set.all()
#         serializer = MemeSerializer(memes, many=True)
        
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         user=request.user  # Get the user from the request
#         data = request.data.copy()  # Make a copy of the request data
#         data['user'] = user.id  # Add the user id to the data

#         serializer = MemeSerializer(data=data)  # Pass the modified data to the serializer
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = Student.objects.create(username, password=password)
        user.save()

        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def registerCommittee(request):
    if request.method == 'POST':
        name = request.data.get('name')
        department = request.data.get('department')
        email = request.data.get('email')
        desc = request.data.get('desc')

        if not name or not department or not email or not desc:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if Committee.objects.filter(name=name).exists():
            return Response({'error': 'Committee already exists'}, status=status.HTTP_400_BAD_REQUEST)

        committee = Committee.objects.create(name=name, department=department, email=email, desc=desc)
        committee.save()

        return Response({'message': 'Committee created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def registerStudent(request):
    if request.method == 'POST':
        name = request.data.get('name')
        department = request.data.get('department')
        email = request.data.get('email')
        rollno = request.data.get('rollno')
        ac_year = request.data.get('ac_year')

        if not name or not department or not email or not rollno or not ac_year:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if Student.objects.filter(rollno=rollno).exists():
            return Response({'error': 'Student already exists'}, status=status.HTTP_400_BAD_REQUEST)

        student = Student.objects.create(name=name, department=department, email=email, rollno=rollno, ac_year=ac_year)
        student.save()

        return Response({'message': 'Student created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def registerFaculty(request):
    if request.method == 'POST':
        name = request.data.get('name')
        department = request.data.get('department')
        email = request.data.get('email')
        fac_id = request.data.get('fac_id')
        is_principle = request.data.get('is_principle')
        is_hod = request.data.get('is_hod')
        is_mentor = request.data.get('is_mentor')
        is_dean = request.data.get('is_dean')

        if not name or not department or not email or not fac_id or not is_principle or not is_hod or not is_mentor or not is_dean:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if Faculty.objects.filter(fac_id=fac_id).exists():
            return Response({'error': 'Faculty already exists'}, status=status.HTTP_400_BAD_REQUEST)

        faculty = Faculty.objects.create(name=name, department=department, email=email, fac_id=fac_id, is_principle=is_principle, is_hod=is_hod, is_mentor=is_mentor, is_dean=is_dean)
        faculty.save()

        return Response({'message': 'Faculty created successfully'}, status=status.HTTP_201_CREATED)
