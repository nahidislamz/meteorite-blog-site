from rest_framework import serializers
from .models import *



class TagsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['name',]

class CommentSerializer(serializers.ModelSerializer):
    author_full_name = serializers.CharField()
    class Meta:
        model = Comment
        fields = ['author_full_name', 'body', 'published_on']


class CommentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['author', 'body', 'post']




class PostListSerializer(serializers.ModelSerializer):

    total_comments = serializers.IntegerField()
    author_full_name = serializers.CharField()

    class Meta:
        model = Post
        fields = ['slug', 'title','thumbnail','total_comments', 'author_full_name', 'published_on']


class PostDetailSerializer(serializers.ModelSerializer):

    comments_list = CommentSerializer(many=True)
    total_comments = serializers.IntegerField()
    author_full_name = serializers.CharField()
    tags_list = TagsSerializer(many=True)
    class Meta:
        model = Post
        fields = ['slug', 'title','thumbnail', 'body','tags_list', 'author_full_name',
                  'published_on', 'comments_list', 'total_comments']



