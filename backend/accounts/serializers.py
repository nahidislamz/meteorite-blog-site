from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import force_text

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





class PasswordResetSerializer(serializers.Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    email = serializers.EmailField()

    password_reset_form_class = PasswordResetForm

    def get_email_options(self):
        """Override this method to change default e-mail options"""
        return {}

    def validate_email(self, value):
        # Create PasswordResetForm with the serializer
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)

        return value

    def save(self):
        request = self.context.get('request')
        # Set some values to trigger the send_email method.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }

        opts.update(self.get_email_options())
        self.reset_form.save(**opts)


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)
    uid = serializers.CharField()
    token = serializers.CharField()

    set_password_form_class = SetPasswordForm

    def custom_validation(self, attrs):
        pass

    def validate(self, attrs):
        self._errors = {}

        # Decode the uidb64 to uid to get User object
        try:
            uid = force_text(uid_decoder(attrs['uid']))
            self.user = UserModel._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
            raise ValidationError({'uid': ['Invalid value']})

        self.custom_validation(attrs)
        # Construct SetPasswordForm instance
        self.set_password_form = self.set_password_form_class(
            user=self.user, data=attrs
        )
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        if not default_token_generator.check_token(self.user, attrs['token']):
            raise ValidationError({'token': ['Invalid value']})

        return attrs

    def save(self):
        return self.set_password_form.save()


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128)
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)

    set_password_form_class = SetPasswordForm

    def __init__(self, *args, **kwargs):
        self.old_password_field_enabled = getattr(
            settings, 'OLD_PASSWORD_FIELD_ENABLED', False
        )
        self.logout_on_password_change = getattr(
            settings, 'LOGOUT_ON_PASSWORD_CHANGE', False
        )
        super(PasswordChangeSerializer, self).__init__(*args, **kwargs)

        if not self.old_password_field_enabled:
            self.fields.pop('old_password')

        self.request = self.context.get('request')
        self.user = getattr(self.request, 'user', None)

    def validate_old_password(self, value):
        invalid_password_conditions = (
            self.old_password_field_enabled,
            self.user,
            not self.user.check_password(value)
        )

        if all(invalid_password_conditions):
            err_msg = _("Your old password was entered incorrectly. Please enter it again.")
            raise serializers.ValidationError(err_msg)
        return value

    def validate(self, attrs):
        self.set_password_form = self.set_password_form_class(
            user=self.user, data=attrs
        )

        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        return attrs

    def save(self):
        self.set_password_form.save()
        if not self.logout_on_password_change:
            from django.contrib.auth import update_session_auth_hash
            update_session_auth_hash(self.request, self.user)