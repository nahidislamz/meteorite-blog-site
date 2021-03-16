from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', AdminPostListView.as_view()),
    path('posts/view/<slug>/', AdminPostDetailView.as_view()),
    path('users/', AdminUserListView.as_view()),
    path('users/detail/', AdminUserDetailView.as_view()),
    path('comments/list/all/', AllCommentsListView.as_view()),
    path('comments/detail/<pk>/', CommentDetailView.as_view()),
    path('comments/list/<slug>/', PostCommentsListView.as_view()),
]
