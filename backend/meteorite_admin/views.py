from rest_framework import generics
from blog.models import *
from accounts.models import UserProfile
from .serializers import *
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
User = get_user_model()

class AdminPostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_on')
    serializer_class = AdminPostListSerializer
    permission_classes = (IsAdminUser,)
    lookup_field = 'slug'
    authentication_classes = (JSONWebTokenAuthentication,)


class AdminPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = AdminPostDetailSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)
    lookup_field = 'slug'

class AllCommentsListView(generics.ListAPIView):
    """View For Listing All The Comments"""

    queryset = Comment.objects.all().order_by('-published_on')
    serializer_class = CommentListSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """View To Get The Details Of A Comment"""

    queryset = Comment.objects.all()
    serializer_class = CommentDetailSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)


class PostCommentsListView(generics.ListAPIView):
    """View To Get The List Of Comments Of A Particular Post"""

    def get(self, request, *args, **kwargs):
        queryset = Comment.objects.filter(
            post__slug=kwargs.get('slug')).order_by('-published_on')
        serializer = CommentListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminUserListView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = AdminUserListSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserDetailSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAdminUser,)

    def destroy(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.data.get('pk'))
        admin_user = User.objects.get(pk=1)
        if instance == admin_user:
            return Response({'detail': "Can't Delete Admin Of The Website"}, status=status.HTTP_400_BAD_REQUEST)
        if not instance:
            return Response({'detail': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        instance.delete()
        return Response(status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.query_params.get('pk'))
        if not instance:
            return Response({'detail': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.data.get('pk'))
        if not instance:
            return Response({'detail': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AdminUserDetailSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)
