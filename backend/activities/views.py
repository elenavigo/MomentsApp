from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

from django.db.models import Q, F, FloatField, ExpressionWrapper
from django.db.models.functions import Power, Sqrt

from activities.models import Activity
from activities.utils import get_distance_from_lat_lng_km
from activities.constants import OFFICE_COORDINATES


class ActivityListView(APIView):
    @staticmethod
    def _filter_queryset_by_distance(queryset, distance_km):
        if not distance_km:
            return queryset
        queryset = queryset.annotate(
                lat=F("location__lat"),
                lng=F("location__lng"),
            ).annotate(
                distance_km=ExpressionWrapper(
                    Sqrt(
                        Power(F("lat") - OFFICE_COORDINATES["lat"], 2) +
                        Power(F("lng") - OFFICE_COORDINATES["lng"], 2)
                    ) * 111, 
                    output_field=FloatField()
                ))
        return queryset.filter(distance_km__lte=distance_km)


    def get(self, request):
        search_term = request.query_params.get('search_term')
        min_people = request.query_params.get('min_people')
        max_people = request.query_params.get('max_people')
        categories = request.query_params.get('categories')
        distance = request.query_params.get('distance')

        activities = Activity.objects.all()

        if categories:
            activities = activities.filter(category__in=categories.split(','))
        if min_people:
            activities = activities.filter(max_people__gte=min_people)
        if max_people:
            activities = activities.filter(min_people__lte=max_people)
        if distance:
            distance_km = float(distance) / 1000
            activities = self._filter_queryset_by_distance(
                activities,
                distance_km
            )
        if search_term:
            activities = activities.filter(
                Q(title__icontains=search_term) | Q(description__icontains=search_term)
            )

        paginator = PageNumberPagination()
        paginated_activities = paginator.paginate_queryset(activities, request)
        data = [
            {
                "id": activity.id,
                "title": activity.title,
                "description": activity.description,
                "image_url": activity.image_url,
                "min_people": activity.min_people,
                "max_people": activity.max_people,
                "category": activity.category,
                "location": activity.location,
                "distance": get_distance_from_lat_lng_km(
                    activity.location["lat"], activity.location["lng"]
                )
            }
            for activity in paginated_activities
        ]
        return paginator.get_paginated_response(data)

    