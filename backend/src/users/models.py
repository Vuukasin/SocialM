from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.db.models.signals import post_save
from django.urls import resolve

from django.conf import settings


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('User must have an email addres')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            username=username,
            email=email
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            username,
            email,
            password=password
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def post_count(self):
        return self.posts.count()
    
    def following_count(self):
        return self.followers.count()
    
    def followers_count(self):
        return self.following.count()

    def notification_count(self):
        return self.notifications.filter(is_seen=False).count()


def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=25, blank=True)
    last_name = models.CharField(max_length=25, blank=True)
    avatar = models.ImageField(upload_to=user_directory_path, default='avatar.png')
    bio = models.TextField(max_length=255, blank=True)
    location = models.CharField(max_length=50, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.user.username

    def create_profile(sender, instance, created, *args, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    
post_save.connect(Profile.create_profile, sender=User)