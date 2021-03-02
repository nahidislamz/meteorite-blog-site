from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile
from blog.models import Post
from blog.serializers import *

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email',
                  'username', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user_instance = User.objects.create(**validated_data)
        user_instance.set_password(password)
        user_instance.save()
        return user_instance


class UserProfileSerializer(serializers.ModelSerializer):

    website = serializers.URLField(
        source='profile.website', allow_blank=True, allow_null=True)
    bio = serializers.CharField(
        source='profile.bio', allow_blank=True, allow_null=True)
    facebook = serializers.URLField(
        source='profile.facebook', allow_blank=True, allow_null=True)
    twitter = serializers.URLField(
        source='profile.twitter', allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name',
                  'website', 'bio', 'facebook', 'twitter']

    def update(self, instance, validated_data):

        profile_data = validated_data.pop('profile', None)
        self.update_or_create_profile(instance, profile_data)
        return super(UserProfileSerializer, self).update(instance, validated_data)

    def update_or_create_profile(self, user, profile_data):

        UserProfile.objects.update_or_create(user=user, defaults=profile_data)


class UserStatus(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['is_active', 'is_superuser']




class PostCreateSerializer(serializers.ModelSerializer):
    #tags_list = TagsSerializer(many=True)
    class Meta:
        model = Post
        fields = ('title','thumbnail','body','tags', 'author','is_published')


class PostListSerializer(serializers.ModelSerializer):

    total_comments = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ('title', 'is_published', 'slug',
                  'total_comments', 'created_on')

class PostUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('title','thumbnail', 'body')