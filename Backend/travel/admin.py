from django.contrib import admin
from .models import Trip, Rating, Like, Comment


admin.site.register(Trip)
admin.site.register(Rating)
admin.site.register(Like)
admin.site.register(Comment)
