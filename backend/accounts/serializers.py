from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from rest_auth.registration.serializers import RegisterSerializer
from .models import UserProfile
from blog.models import Post,Tag
from blog.serializers import *

User = get_user_model()

class PrimaryKeyCreateRelatedField(serializers.PrimaryKeyRelatedField):

    def to_internal_value(self, data):
        if self.pk_field is not None:
            data = self.pk_field.to_internal_value(data)
        try:
            return self.get_queryset().get(pk=data)
        except ObjectDoesNotExist:
            # self.fail('does_not_exist', pk_value=data)
            return self.get_queryset().create(pk=data)
        except (TypeError, ValueError):
            self.fail('incorrect_type', data_type=type(data).__name__)

class SignUpSerializer(RegisterSerializer):

    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)
    def save(self, request):
        user = super().save(request)
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):

    website = serializers.URLField(
        source='profile.website', allow_blank=True, allow_null=True)
    profile_pic = serializers.ImageField(source='profile.profile_pic')
    bio = serializers.CharField(
        source='profile.bio', allow_blank=True, allow_null=True)
    facebook = serializers.CharField(
        source='profile.facebook', allow_blank=True, allow_null=True)
    twitter = serializers.CharField(
        source='profile.twitter', allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name',
                  'website','profile_pic', 'bio', 'facebook', 'twitter']

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
    tags = PrimaryKeyCreateRelatedField(many=True, queryset=Tag.objects.all())
    class Meta:
        model = Post
        fields = ('title','thumbnail','body','tags', 'author','is_published')

        def run_validation(self, data=serializers.empty):
            if 'tags' in data:
                for tag in data['tags']:
                    Tag.objects.get_or_create(name=tag)

            return super(PostCreateSerializer, self).run_validation(data)

        def create(self, validated_data):
            tags_data = validated_data.pop('tags')
          
            post = Post.objects.create(**validated_data)

            for tag in tags_data:
                post.tags.add(tag)
            return post

class PostListSerializer(serializers.ModelSerializer):

    total_comments = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ('title','thumbnail', 'is_published', 'slug',
                  'total_comments', 'created_on')

class PostUpdateSerializer(serializers.ModelSerializer):

    tags = PrimaryKeyCreateRelatedField(many=True, queryset=Tag.objects.all())
    
    class Meta:
        model = Post
        fields = ('title','thumbnail', 'body','tags')




