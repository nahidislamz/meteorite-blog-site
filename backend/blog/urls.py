from django.urls import path

from .views import *

urlpatterns = [
    path('', PostListView.as_view()),
    path('search/', PostListFilter.as_view(), name='search'),
    path('details_view/<slug>/', PostDetailView.as_view(), name='post-detail'),
    path('comments/<slug>/', comment_list_view),
    path('comment-create/<slug>/',comment_create_view),
    path('tags-list/', TagsListView),
    path('tags/<slug>/', post_tags_list_view),
]