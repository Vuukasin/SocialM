from django.urls import path

from .views import RegisterView, RetrieveUserView, UsersListView

urlpatterns = [

    path('users/register/', RegisterView.as_view()),
    path('users/me', RetrieveUserView.as_view()),
    path('users/', UsersListView.as_view())

]