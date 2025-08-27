import django_filters
from .models import Trip

class TripFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    min_duration = django_filters.NumberFilter(field_name="duration", lookup_expr="gte")
    max_duration = django_filters.NumberFilter(field_name="duration", lookup_expr="lte")

    class Meta:
        model = Trip
        fields = ["destination", "min_price", "max_price", "min_duration", "max_duration"]
