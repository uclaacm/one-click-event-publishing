from django.contrib import admin
from django.urls import path, include
from .views import create_event
from .utilities import facebook_graph

urlpatterns = [
    path('create-event',  create_event),
    path('post-facebook',facebook_graph)
]