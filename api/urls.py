from django.contrib import admin
from django.urls import path, include
from .views import create_event

urlpatterns = [
    path('/create-event',  create_event)
]