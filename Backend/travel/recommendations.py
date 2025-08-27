from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from django.core.cache import cache
from .models import Trip, Rating

def _build_tfidf_matrix():
    """Build and cache TF-IDF matrix for all trips."""
    trips = list(Trip.objects.all().only("id", "title", "destination", "duration", "likes"))
    if not trips:
        return [], None, None

    corpus = [f"{t.title} {t.destination} {t.duration}" for t in trips]
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(corpus)

    # store in cache for 10 mins (or longer if you want)
    cache.set("tfidf_trips", (trips, tfidf_matrix), 600)
    return trips, tfidf_matrix


def recommend_trips_for_user(user, top_n=5):
    """
    Recommend trips for a user using content similarity.
    Cached for 10 minutes per user.
    """
    cache_key = f"user_recs_{user.id}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    # load trips + tfidf from cache
    tfidf_cached = cache.get("tfidf_trips")
    if tfidf_cached:
        trips, tfidf_matrix = tfidf_cached
    else:
        trips, tfidf_matrix = _build_tfidf_matrix()

    if not trips:
        return []

    user_ratings = Rating.objects.filter(user=user).select_related("trip")
    if not user_ratings.exists():
        top_trips = Trip.objects.order_by("-likes")[:top_n]
        cache.set(cache_key, list(top_trips), 600)
        return top_trips

    fav_trip = user_ratings.order_by("-score").first().trip
    trip_index_map = {t.id: i for i, t in enumerate(trips)}

    if fav_trip.id not in trip_index_map:
        # if trip not in our cached TF-IDF (edge case)
        top_trips = Trip.objects.order_by("-likes")[:top_n]
        cache.set(cache_key, list(top_trips), 600)
        return top_trips

    fav_index = trip_index_map[fav_trip.id]
    cosine_sim = cosine_similarity(tfidf_matrix[fav_index], tfidf_matrix).flatten()

    similar_indices = np.argsort(-cosine_sim)[1 : top_n + 1]
    recommended = [trips[i] for i in similar_indices]

    cache.set(cache_key, recommended, 600)
    return recommended
