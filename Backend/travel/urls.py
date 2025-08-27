from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripViewSet, RatingViewSet, LikeViewSet, CommentViewSet, RegisterView, DestinationDetailView, RecommendationView, PopularRecommendationView ,SaveTripView    

router = DefaultRouter()
router.register(r'trips', TripViewSet)
router.register(r'ratings', RatingViewSet, basename='rating')
router.register(r'likes', LikeViewSet, basename='like')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name="register"),
    path('destination/<str:city_name>/', DestinationDetailView.as_view(), name="destination-detail"),
    path('recommendations/personalized/', RecommendationView.as_view(), name="personalized-recs"),
    path('recommendations/popular/', PopularRecommendationView.as_view(), name="popular-recs"),
    path("trips/<int:trip_id>/save/", SaveTripView.as_view(), name="save_trip"),
]
