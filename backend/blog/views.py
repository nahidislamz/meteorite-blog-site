from rest_framework import generics,status,permissions
from .serializers import *
from .models import *
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'results': data
        })


class PostListView(generics.ListAPIView):
    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostListSerializer
    pagination_class = CustomPagination
    lookup_field = 'slug'


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'


@api_view(['GET'])
def TagsListView(request):
    tag_list = Tag.objects.all()
    serializer = TagsSerializer(tag_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def post_tags_list_view(request, slug):
    post_instance = get_object_or_404(Post, slug=slug)
    tag_list = Tag.objects.filter(
        posts=post_instance)
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
    
    if request.method == 'POST':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()

        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = {'token': token}

        try:
            valid_data = VerifyJSONWebTokenSerializer().validate(token_data)
            author_user= valid_data.get('user')
        except:
            return Response({'detail': 'Invalid Token, No Log in user'}, status.HTTP_400_BAD_REQUEST)

    
        post_instance = get_object_or_404(Post, slug=slug)
        request.data['author'] = author_user.pk
        request.data['post'] = post_instance.pk
        
        serializer = CommentCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'comments': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)



