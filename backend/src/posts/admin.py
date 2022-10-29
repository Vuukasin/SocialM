from django.contrib import admin
from .models import Post, Comment, Like, Stream, Follow


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Stream)
admin.site.register(Follow)