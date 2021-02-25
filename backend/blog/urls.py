from django.urls import path

from .views import *

urlpatterns = [
    path('', PostListView.as_view()),
    path('details_view/<slug>/', PostDetailView.as_view(), name='post-detail'),
    path('comments/<slug>/', comment_list_view),
    path('comment/<slug>/',comment_create_view),

    path('tags/<slug>/', tags_list_view),
]