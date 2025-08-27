from django.db import models
from django.contrib.auth.models import User   # for likes/ratings/comments


class Trip(models.Model):
    title = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=200)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class Rating(models.Model):
    trip = models.ForeignKey(Trip, related_name="ratings", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=1)  # e.g. 1–5 stars

    class Meta:
        unique_together = ('trip', 'user')  # one rating per user per trip

    def __str__(self):
        return f"{self.user.username} rated {self.trip.title} ({self.score})"


class Like(models.Model):
    trip = models.ForeignKey(Trip, related_name="likes", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('trip', 'user')  # no duplicate likes

    def __str__(self):
        return f"{self.user.username} liked {self.trip.title}"


class Comment(models.Model):
    trip = models.ForeignKey(Trip, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} on {self.trip.title}"
    
    
class SavedTrip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saved_trips")
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="saved_by")
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "trip")  # prevent duplicates
