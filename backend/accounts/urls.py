from django.urls import path, re_path,include
from rest_auth.registration.views import RegisterView, VerifyEmailView,ConfirmEmailView
from rest_auth.views import LoginView, LogoutView,PasswordResetView, PasswordResetConfirmView

from .views import *
from .admin_views import *

urlpatterns = [
    #path('signup/',SignUpView.as_view()),
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
 
    path('signup/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    
    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
         VerifyEmailView.as_view(), name='account_confirm_email'),

    path('password-reset/', PasswordResetView.as_view()),

    path('password-reset-confirm/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'), 

    path('profile/',UserProfileView.as_view()),
    path('user-status/',UserStatusView.as_view()),

    path('new-post/', post_create_view),
    path('post-list/', PostListView.as_view()),
    path('update-post/', post_update_view),
    path('delete-post/', post_delete_view),
]
