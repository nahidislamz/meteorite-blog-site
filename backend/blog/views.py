from rest_framework import generics 
from .serializers import *
from .models import *
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


class PostListView(generics.ListAPIView):

    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostListSerializer
    lookup_field = 'slug'


class PostDetailView(generics.RetrieveAPIView):

    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'




@api_view(['GET'])
def tags_list_view(request, slug):
    post_instance = get_object_or_404(Post, slug=slug)
    tag_list = Tag.objects.filter(
        post=post_instance)
    serializer = TagsSerializer(tag_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def comment_list_view(request, slug):
    post_instance = get_object_or_404(Post, slug=slug)
    comment_list = Comment.objects.filter(
        post=post_instance, is_displayed=True)
    serializer = CommentSerializer(comment_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def comment_create_view(request, slug):
    post_instance = get_object_or_404(Post, slug=slug)
    request.data['post'] = post_instance.pk
    serializer = CommentCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
