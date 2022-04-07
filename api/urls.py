from django.contrib import admin
from django.urls import path, include
from .views import create_event

from .views import testJwt

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('create-event',  create_event),
    path('testAuthenticated', testJwt), # Endpoint with authentication
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh')
]