from django.contrib import admin
from django.urls import path, include
from .views import create_event

#from .views import UserAPIView
from .views import testJwt

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('create-event',  create_event),
    #path('test', UserAPIView.as_view(), name='user'),
    path('test', testJwt),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh')
]