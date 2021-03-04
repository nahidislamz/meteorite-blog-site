from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .utils import unique_slug_generator
from django.core.validators import RegexValidator

User = get_user_model()

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

class Tag(models.Model):
    name = models.CharField(max_length=50, verbose_name=_("Name"),
    unique=True, primary_key=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(
        _("Thumbnail"), upload_to=upload_to, default='posts/default.jpg')
    body = models.TextField()
    tags = models.ManyToManyField(Tag,related_name="posts",verbose_name=_("Tags"))
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts', related_query_name='post')   
    slug = models.SlugField(blank=True, null=True)
    is_published = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    published_on = models.DateTimeField(null=True, blank=True)
    last_edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def comments_list(self):
        return self.comments.filter(is_displayed=True)

    @property
    def tags_list(self):
        return self.tags.all()
    @property
    def total_comments(self):
        return self.comments_list.count()

    @property
    def author_full_name(self):
        try:
            return f'{self.author.first_name} {self.author.last_name}'
        except:
            return "Name Not Set"

    class Meta:
        indexes = [models.Index(fields=['slug'])]
        ordering = ['-published_on']


@receiver(post_save, sender=Post)
def generate_unique_slug_for_posts(sender, instance, created, *args, **kwargs):

    if created:
        instance.slug = unique_slug_generator(instance)
        instance.save()


@receiver(pre_save, sender=Post)
def update_published_on(sender, instance, **kwargs):
  
    if instance.id:
        old_value = Post.objects.get(pk=instance.id).published_on
        if not old_value:
            instance.published_on = timezone.now()




class Comment(models.Model):

    author = models.ForeignKey(User,default=True, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')
    body = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE,
                             related_name='comments', related_query_name='comment')
    is_displayed = models.BooleanField(default=True)
    published_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Post - "{self.post.title}", Body - "{self.body}"'

    @property
    def author_full_name(self):
        try:
            return f'{self.author.first_name} {self.author.last_name}'
        except:
            return "Name Not Set"
