from rest_framework import serializers
from .models import Trip, Rating, Like, Comment
from django.contrib.auth.models import User

# Nested serializers for related objects
class RatingSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'user', 'score']

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Like
        fields = ['id', 'user']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at']

# Main Trip Serializer with nested ratings, likes, and comments
class TripSerializer(serializers.ModelSerializer):
    ratings = RatingSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = "__all__"
