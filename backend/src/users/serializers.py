from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import permissions, serializers
from rest_framework.views import APIView

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')

        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializers_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializers_errors['non_field_errors']}
            )

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username', 'email', 'post_count', 'followers_count', 'following_count', 'notification_count', 'avatar')

    def get_avatar(self, user):
        request = self.context.get('request')
        avatar = user.profile.avatar.url
        return request.build_absolute_uri(avatar)


class UserOwnerSerializer(serializers.Serializer):
    username = serializers.CharField(read_only=True)
    avatar = serializers.ImageField(source='profile.avatar', read_only=True)