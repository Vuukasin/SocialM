from rest_framework import serializers

from .models import Post, Comment, Like, Stream, Follow

from users.serializers import UserOwnerSerializer

from django.conf import settings

POST_ACTION_OPTIONS = settings.POST_ACTION_OPTIONS

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class PostStreamSerializer(serializers.ModelSerializer):
    user = UserOwnerSerializer()
    liked_by_req_user = serializers.SerializerMethodField()
    

    class Meta:
        model = Post
        fields = ['id', 'content', 'image_size', 'user', 'liked_by_req_user', 'like_count', 'comment_count']

    def get_liked_by_req_user(self, post):
        user = self.context['request'].user
        liked_by_req_user = Like.objects.filter(post=post, user=user)
        if liked_by_req_user:
            return True
        return False

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['post', 'user']

class PostActionSerializer(serializers.Serializer):
    post_id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in POST_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for post")
        return value

