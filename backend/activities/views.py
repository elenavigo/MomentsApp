from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from activities.models import Activity
from django.db.models import Q

class ActivityListView(APIView):
    def get(self, request):
        search_term = request.query_params.get('search_term')
        min_people = request.query_params.get('min_people')
        max_people = request.query_params.get('max_people')
        category = request.query_params.get('category')

        activities = Activity.objects.all()

        if category:
            activities = activities.filter(category=category)
        if min_people:
            activities = activities.filter(max_people__gte=min_people)
        if max_people:
            activities = activities.filter(min_people__lte=max_people)
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
            }
            for activity in paginated_activities
        ]
        return paginator.get_paginated_response(data)