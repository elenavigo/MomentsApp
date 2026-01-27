import { DEFAULT_FILTERS } from '@/hooks/useActivities';
import axios from 'axios';

export interface Activity {
  id: number;
  title: string;
  description: string;
  image_url: string;
  min_people: number;
  max_people: number;
  category: string;
  location: { lat: number; lng: number };
}

export type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Activity[];
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export type FiltersType = {
  min_people?: number;
  max_people?: number;
  categories?: string[];
  distance?: number;
};

export type GetActivitiesParams = {
  url?: string;
  filters?: FiltersType;
  signal?: AbortSignal;
};

export async function getActivities({
  url = `${API_BASE_URL}/activities/`,
  filters,
  signal,
}: GetActivitiesParams): Promise<PaginatedResponse> {
  if (filters) {
    const params = new URLSearchParams();

    if (
      filters.min_people &&
      filters.min_people !== DEFAULT_FILTERS.minPeople
    ) {
      params.append('min_people', filters.min_people.toString());
    }
    if (
      filters.max_people &&
      filters.max_people !== DEFAULT_FILTERS.maxPeople
    ) {
      params.append('max_people', filters.max_people.toString());
    }
    if (filters.categories && filters.categories.length > 0) {
      params.append('categories', filters.categories.join(','));
    }
    if (filters.distance && filters.distance !== DEFAULT_FILTERS.distance) {
      params.append('distance', filters.distance.toString());
    }

    url += `?${params.toString()}`;
  }

  const res = await axios.get(url, { signal });

  return res.data;
}
