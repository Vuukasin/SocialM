from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response


from .models import Stream, Post, Like
from .serializers import PostStreamSerializer, PostActionSerializer, LikeSerializer
# Create your views here.


class PostStreamApiView(ListAPIView):
    serializer_class = PostStreamSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        posts = Stream.objects.filter(user=user)
        post_ids = []
        for post in posts:
            post_ids.append(post.post.id)
        qs = Post.objects.filter(id__in=post_ids).order_by('-posted')
        return qs

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def post_action_view(request, *args, **kwargs):
    serializer = PostActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post_id = data.get('post_id')
        action = data.get('action')
        user = request.user
        post = Post.objects.filter(id=post_id)
        if not post.exists():
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        if action == 'like':
            Like.objects.create(post_id=post_id, user=user)
            return Response({}, status=status.HTTP_200_OK)
        elif action == 'unlike':
            like = Like.objects.filter(post_id=post_id, user=user)
            like.delete()
            return Response({}, status=status.HTTP_200_OK) 
        return Response({}, status=status.HTTP_200_OK)

