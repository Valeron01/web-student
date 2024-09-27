from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('auth', views.auth),
    path('register', views.register),
    path('profile', views.profile),
    path('logout', views.logout),
    path('get_panel_data', views.get_panel_data),
    path('get_subject_data', views.get_subject_data),
    path('modify_mark', views.modify_mark),
]