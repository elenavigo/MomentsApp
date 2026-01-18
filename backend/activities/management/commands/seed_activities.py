from django.core.management.base import BaseCommand
from faker import Faker
import random

from activities.models import Activity

fake = Faker()

CATEGORIES = ["corporate", "adventure", "learning", "creative", "gastronomy"]
IMAGES = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2",
]

class Command(BaseCommand):
    help = "Seed database with random activities"

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=100,
            help="Número de actividades a crear",
        )

    def handle(self, *args, **options):
        count = options["count"]
        for _ in range(count):
            Activity.objects.create(
                title=fake.sentence(nb_words=4),
                description=fake.paragraph(),
                image_url=random.choice(IMAGES),
                min_people=random.randint(2, 8),
                max_people=random.randint(10, 40),
                category=random.choice(CATEGORIES),
                location={
                    "lat": 41.38 + random.uniform(-0.05, 0.05),
                    "lng": 2.17 + random.uniform(-0.05, 0.05),
                },
            )

        self.stdout.write(
            self.style.SUCCESS(f"✅ {count} activities created")
        )
