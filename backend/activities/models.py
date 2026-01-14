from django.db import models

class Activity(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField()
    min_people = models.PositiveIntegerField()
    max_people = models.PositiveIntegerField()
    location = models.JSONField(null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.title

