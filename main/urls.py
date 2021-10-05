from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('auth', views.auth),
    path('register', views.register),
    path('profile', views.profile),
    path('logout', views.logout),
]