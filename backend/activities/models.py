from django.db import models

class Activity(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField()
    min_people = models.PositiveIntegerField()
    max_people = models.PositiveIntegerField()

    def __str__(self):
        return self.title

