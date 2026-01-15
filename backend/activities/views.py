from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from activities.models import Activity

class ActivityListView(APIView):
    def get(self, request):
        activities = Activity.objects.all()

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
            }
            for activity in paginated_activities
        ]
        return paginator.get_paginated_response(data)