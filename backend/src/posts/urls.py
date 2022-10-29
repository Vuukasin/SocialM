from django.urls import path
from .views import PostStreamApiView, post_action_view

urlpatterns = [

    path('feed/', PostStreamApiView.as_view(), name='feed'),
    path('post-action/', post_action_view, name='post-action'),
    # path('posts/<int:id>/like/', PostLikeApiView.as_view(), name='like-post'),
    # path('posts/<int:id>/like/', PostUnlikeApiView.as_view(), name='unlike-post'),

]