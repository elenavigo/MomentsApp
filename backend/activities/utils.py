import math
from activities.constants import OFFICE_COORDINATES

def get_distance_from_lat_lng_km(lat, lng):
    R = 6371
    dLat = math.radians(lat - OFFICE_COORDINATES["lat"])
    dLng = math.radians(lng - OFFICE_COORDINATES["lng"])
    lat1 = math.radians(OFFICE_COORDINATES["lat"])
    lat2 = math.radians(lat)

    a = math.sin(dLat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dLng / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return round(distance, 3)
