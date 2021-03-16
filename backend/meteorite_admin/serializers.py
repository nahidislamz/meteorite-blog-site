from rest_framework import serializers
from blog.models import *
from accounts.models import UserProfile
from django.contrib.auth import get_user_model



User = get_user_model()

class AdminPostDetailSerializer(serializers.ModelSerializer):
    """Serializer To List Details Of A Post In The For Admin Panel"""

    class Meta:
        model = Post
        fields = '__all__'


class AdminPostListSerializer(serializers.ModelSerializer):
    """Serializer To List All Posts In The Database For Admin Panel"""

    class Meta:
        model = Post
        fields = ['title', 'author_full_name',
                  'slug', 'is_published', 'total_comments']


class CommentListSerializer(serializers.ModelSerializer):
    """DRF Serializer For Listing Comments"""
    author_full_name = serializers.CharField()
    author_profile = serializers.ImageField()
    post_title = serializers.CharField(source='post.title')

    class Meta:
        model = Comment
        fields = ['id', 'author_full_name', 'author_profile', 'post_title','body',
                  'is_displayed', 'published_on']


class CommentDetailSerializer(serializers.ModelSerializer):
    """DRF Serializer For The Detail Of A Comment"""
    author_full_name = serializers.CharField()
    author_profile = serializers.ImageField()
    post_title = serializers.CharField(source='post.title')

    class Meta:
        model = Comment
        fields = ['author_full_name', 'author_profile','body',
                  'post_title', 'is_displayed', 'published_on']


class AdminUserListSerializer(serializers.ModelSerializer):
    """Serializer To Show List Of Users In The Admin Panel"""

    class Meta:
        model = User
        fields = ['id', 'password', 'username',
                  'email', 'first_name', 'last_name', 'is_active']

    def create(self, validated_data):
        raw_password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(raw_password)
        user.save()
        return user


class AdminUserDetailSerializer(serializers.ModelSerializer):
    """Serializer To Show The Full Detail Of A User With Its Profile"""

    website = serializers.URLField(
        source='profile.website', allow_blank=True, allow_null=True)
    bio = serializers.CharField(
        source='profile.bio', allow_blank=True, allow_null=True)
    facebook = serializers.CharField(
        source='profile.facebook', allow_blank=True, allow_null=True)
    twitter = serializers.CharField(
        source='profile.twitter', allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ['pk', 'password', 'username', 'email', 'first_name', 'last_name',
                  'website', 'bio', 'facebook', 'twitter',
                  'is_active', 'is_staff', 'is_superuser']

    def update(self, instance, validated_data):
        """Overwriting The Default update Method For This Serializer
        To Update User And UserProfile At A Single Endpoint"""

        profile_data = validated_data.pop('profile', None)
        self.update_or_create_profile(instance, profile_data)
        return super(AdminUserDetailSerializer, self).update(instance, validated_data)

    def update_or_create_profile(self, user, profile_data):
        """This always creates a Profile if the User is missing one"""

        UserProfile.objects.update_or_create(user=user, defaults=profile_data)


