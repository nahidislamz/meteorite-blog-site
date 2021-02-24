from django.urls import path

from .views import *

urlpatterns = [
    path('', PostListView.as_view()),
    path('details_view/<slug>/', PostDetailView.as_view(), name='post-detail'),
    path('<slug>/', comment_list_view),
    path('comment/<slug>/',comment_create_view),
]