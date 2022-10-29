from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Profile

User = get_user_model()

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email']

    fieldsets = (
        (None, {
            "fields": (
                ('username', 'email', 'password')
                
            ),
        }),
    )

    search_fields = ('username', 'email')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Profile)
