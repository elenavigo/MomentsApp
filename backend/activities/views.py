from rest_framework.views import APIView
from rest_framework.response import Response
from activities.models import Activity

class ActivityListView(APIView):
    def get(self, request):
        activities = Activity.objects.all()
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
            for activity in activities
        ]
        return Response(data)