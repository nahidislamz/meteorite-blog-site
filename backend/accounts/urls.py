from django.urls import path

from .views import *
from .admin_views import *

urlpatterns = [
    path('signup/',SignUpView.as_view()),
    path('profile/',UserProfileView.as_view()),
    path('user-status/',UserStatusView.as_view()),

    path('create-new-post/', post_create_view),
    path('post-list/', PostListView.as_view()),
    path('update-post/', post_update_view),
    path('delete-post/', post_delete_view),
]
