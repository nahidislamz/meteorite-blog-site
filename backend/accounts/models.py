from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()

def upload_to(instance, filename):
    return 'profile/{filename}'.format(filename=filename)

class UserProfile(models.Model):

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    website = models.URLField(blank=True, default="")
    profile_pic = models.ImageField(default="profile/avater.png", upload_to=upload_to, null=True)
    bio = models.TextField(blank=True, max_length=100, default="")
    facebook = models.CharField(max_length=40,blank=True, default="")
    twitter = models.CharField(max_length=40, blank=True, default="")

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @property
    def full_name(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @property
    def username(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, *args, **kwargs):
    if created:
        user_profile = UserProfile(user=instance)
        user_profile.save()
