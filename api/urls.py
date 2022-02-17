from django.contrib import admin
from django.urls import path, include

from .views import main, signin,home


urlpatterns = [
    path('',  main),
    path('signin/',signin, name="signin"),
    path('home/',home,name="home")
]