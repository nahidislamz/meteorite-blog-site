from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from .serializers import *
from django.contrib.auth import get_user_model

User = get_user_model()


class SignUpView(generics.CreateAPIView):
    
    queryset = User.objects.all()
    serializer_class = SignUpSerializer

    def post(self, request, *args, **kwargs):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        password1 = request.data.pop('password1')

        if (not first_name or not last_name or not email or not username):
            return Response({'detail': 'All The Fields Are Required'}, status=status.HTTP_400_BAD_REQUEST)
        elif password != password1 or not password:
            return Response({'detail': 'Error Setting The Password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = SignUpSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                # user.set_password
                return Response(serializer.data, status=status.HTTP_201_CREATED)





class UserProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = UserProfileSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = request.user
        # Disabling The Updation Of Username
        request.data['username'] = instance.username
        serializer = UserProfileSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserStatusView(generics.RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def get(self, request, *Args, **kwargs):
        user_instance = request.user
        data = {'is_active': user_instance.is_active,
                'is_superuser': user_instance.is_superuser}
        return Response(data, status=status.HTTP_200_OK)


