from django.contrib import admin
from django.urls import path, include

from .views import main, signin,createEvent


urlpatterns = [
    path('',  main),
    path('signin/',signin, name="signin"),
    path('create-event/',createEvent,name="create-event")
]

#home-> create-event