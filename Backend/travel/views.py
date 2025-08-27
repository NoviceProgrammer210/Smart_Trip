from rest_framework import viewsets, permissions
from .models import Trip, Rating, Like,  Comment , SavedTrip
from .serializers import TripSerializer, RatingSerializer, LikeSerializer, CommentSerializer
from rest_framework.serializers import ModelSerializer
from rest_framework import generics,permissions
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.views import APIView
from rest_framework import status
import random
from datetime import timedelta, date
from rest_framework import viewsets,filters
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from .recommendations import recommend_trips_for_user
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.db.models import Count,Avg
from .filter import TripFilter


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = TripFilter

    search_fields = ["destination", "title", "tags__name"]
    ordering_fields = ["price", "duration", "created_at"]        
class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    # ✅ Add filters, search, ordering
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # 🔍 Filtering by exact fields
    filterset_fields = ["destination", "date"]

    # 🔎 Search across multiple fields (case-insensitive contains)
    search_fields = ["title", "destination"]

    # ↕️ Allow ordering
    ordering_fields = ["price", "date", "created_at"]
    ordering = ["date"]  # default order
class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Rating.objects.all()

    def perform_create(self, serializer):
        trip = serializer.validated_data['trip']
        user = self.request.user
        if Rating.objects.filter(trip=trip, user=user).exists():
            raise ValidationError("You have already rated this trip. Please update your rating instead.")
        serializer.save(user=user)
class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Like.objects.all()

    @action(detail=False, methods=["post"])
    def toggle(self, request):
        trip_id = request.data.get("trip")
        user = request.user

        if not trip_id:
            return Response({"error": "Trip id is required"}, status=400)

        try:
            trip = Trip.objects.get(id=trip_id)
        except Trip.DoesNotExist:
            return Response({"error": "Trip not found"}, status=404)

        like_obj = Like.objects.filter(trip=trip, user=user).first()
        if like_obj:
            like_obj.delete()
            return Response({"liked": False}, status=200)
        else:
            Like.objects.create(trip=trip, user=user)
            return Response({"liked": True}, status=201)

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"]
        )
        return user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class DestinationView(APIView):
    def get(self, request, city_name):
        url = "https://en.wikivoyage.org/w/api.php"
        params = {
            "action": "query",
            "format": "json",
            "prop": "extracts",
            "titles": city_name,
            "exintro": True,
            "explaintext": True,
        }

        res = requests.get(url, params=params)
        data = res.json()
        pages = data.get("query", {}).get("pages", {})
        page = next(iter(pages.values()))

        if "missing" in page:
            return Response({"error": f"No info found for {city_name}"}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "city": city_name,
            "extract": page.get("extract", "No description available")
        })
    
class DestinationDetailView(APIView):
    def get(self, request, city_name):
        url = f"https://en.wikivoyage.org/api/rest_v1/page/summary/{city_name}"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            
            # Extract useful details
            title = data.get("title", city_name)
            description = data.get("extract", "No description available")
            destination = city_name  

            # Generate random duration (3–10 days)
            duration_days = random.randint(3, 10)

            # Price based on duration (e.g. $120/day + base)
            base_price = 500
            price = base_price + duration_days * 120

            # Random future date for trip (within next 6 months)
            start_date = date.today() + timedelta(days=random.randint(10, 180))

            # Create or get trip
            trip, created = Trip.objects.get_or_create(
                title=title,
                defaults={
                    "destination": destination,
                    "price": price,
                    "duration": f"{duration_days} days",
                    "date": start_date,
                }
            )

            # If trip already exists, update price/duration/date
            if not created:
                trip.destination = destination
                trip.price = price
                trip.duration = f"{duration_days} days"
                trip.date = start_date
                trip.save()

            serializer = TripSerializer(trip)

            return Response({
                "trip": serializer.data,
                "description": description,
                "created": created  # True if new, False if already existed
            })

        return Response({"error": "City not found"}, status=status.HTTP_404_NOT_FOUND)


class RecommendationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        trips = recommend_trips_for_user(request.user)
        return Response(TripSerializer(trips, many=True).data)

class PopularRecommendationView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        qs = (Trip.objects
              .annotate(num_likes=Count("likes"), avg_score=Avg("ratings__score"))
              .order_by("-num_likes", "-avg_score", "-created_at")[:12])
        return Response(TripSerializer(qs, many=True).data)
    
class SaveTripView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, trip_id):
        try:
            trip = Trip.objects.get(pk=trip_id)
            saved, created = SavedTrip.objects.get_or_create(user=request.user, trip=trip)
            if created:
                return Response({"message": "Trip saved!"}, status=201)
            return Response({"message": "Trip already saved."}, status=200)
        except Trip.DoesNotExist:
            return Response({"error": "Trip not found"}, status=404)
    @api_view(["POST"])
    def save_trip(request, pk):
        user_id = request.data.get("user_id")
        if not user_id:
            return Response({"error": "Missing user_id"}, status=400)

        user = get_object_or_404(User, pk=user_id)
        trip = get_object_or_404(Trip, pk=pk)

        trip.saved_by.add(user)
        return Response({"message": "Trip saved!"})

        
@api_view(["POST"])
def save_trip(request, pk):
    # ✅ Get user_id directly from request body
    user_id = request.data.get("user_id")

    if not user_id:
        return Response({"error": "No user_id provided"}, status=400)

    user = get_object_or_404(User, pk=user_id)   # 👈 get user manually
    trip = get_object_or_404(Trip, pk=pk)

    # Assuming Trip has ManyToManyField(User, related_name="saved_trips")
    trip.saved_by.add(user)

    return Response({"message": f"Trip {trip.title} saved for {user.username}"})