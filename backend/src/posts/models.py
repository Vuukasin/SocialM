import uuid

from django.contrib.auth import get_user_model
from django.core.files.images import get_image_dimensions
from django.db import models
from django.db.models import Q
from django.db.models.signals import post_delete, post_save

from notifications.models import Notification

from .utils import calc_image_size

User = get_user_model()



def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.ImageField(upload_to=user_directory_path)
    description = models.TextField(max_length=255, blank=True)
    posted = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)
    image_size = models.IntegerField(blank=True, null=True)
        
    def save(self, *args, **kwargs):
        self.image_size = calc_image_size(self.content)
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username}'s post"

    def comment_count(self):
        return self.comments.count()

    def like_count(self):
        return self.likes.count()


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=255, blank=False, null=False)
    posted = models.DateTimeField(auto_now_add=True)
    notify_code = models.UUIDField(default=uuid.uuid4, editable=False)


    def __str__(self):
        return f"{self.user.username}'s comment"


    def create_notification(sender, instance, *args, **kwargs):
        comment = instance
        post = comment.post
        sender = comment.user
        notify = Notification(post=post, sender=sender, user=post.user, code=comment.notify_code, notification_type=2)
        notify.save()

    def delete_notification(sender, instance, *args, **kwargs):
        comment = instance
        post = comment.post
        sender = comment.user
        notify = Notification.objects.filter(post=post, user=post.user, sender=sender, notification_type=2, code=comment.notify_code)
        notify.delete()

post_save.connect(Comment.create_notification, sender=Comment)
post_delete.connect(Comment.delete_notification, sender=Comment)



class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    notify_code = models.UUIDField(default=uuid.uuid4, editable=False)

    def __str__(self):
        return f"{self.follower} -> {self.following}"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['follower', 'following'], name='unique_follow')
        ]

    def create_notification(sender, instance, *args, **kwargs):
        follow = instance
        sender = follow.follower
        following = follow.following
        notify = Notification(sender=sender, user=following, notification_type=3, code=follow.notify_code)
        notify.save()

    def delete_notification(sender, instance, *args, **kwargs):
        follow = instance
        sender = follow.follower
        following = follow.following
        notify = Notification.objects.filter(sender=sender, user=following, notification_type=3, code=follow.notify_code)
        notify.delete()

post_save.connect(Follow.create_notification, sender=Follow)
post_delete.connect(Follow.delete_notification, sender=Follow)


class Stream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stream_user')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='stream_following', null=True)
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stream_following')
    date = models.DateTimeField(auto_now_add=True)


    def add_post(sender, instance, created, *args, **kwargs):
        post = instance
        user = post.user
        followers = Follow.objects.all().filter(following=user)
        for follower in followers:
            stream = Stream(post=post, user=follower.follower, date=post.posted, following=user)
            stream.save()

    def add_following(sender, instance, created, *args, **kwargs):
        posts = Post.objects.all().filter(user=instance.following)
        if created:
            for post in posts:
                Stream.objects.create(post=post, following=instance.following, user=instance.follower)

post_save.connect(Stream.add_post, sender=Post)
post_save.connect(Stream.add_following, sender=Follow)


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notify_code = models.UUIDField(default=uuid.uuid4, editable=False)


    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['post', 'user'], name='unique_like')
        ]

    def create_notification(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user
        notify = Notification(sender=sender, post=post, user=post.user, notification_type=1, code=like.notify_code)
        notify.save()

    def delete_notification(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user
        notify = Notification.objects.filter(post=post, sender=sender, notification_type=1, code=like.notify_code)
        notify.delete()

post_save.connect(Like.create_notification, sender=Like)
post_delete.connect(Like.delete_notification, sender=Like)



    