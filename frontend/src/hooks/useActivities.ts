import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getActivities,
  type Activity,
  type GetActivitiesParams,
} from '../api/activities';

type Filters = {
  minPeople: number;
  maxPeople: number;
  categories: string[];
  distance: number;
};

export const DEFAULT_FILTERS = {
  minPeople: 2,
  maxPeople: 40,
  categories: [],
  distance: 6000,
};

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingFirstActivities, setLoadingFirstActivities] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchActivities = useCallback(
    async (fetchOptions: GetActivitiesParams = {}, append = false) => {
      try {
        if (append) {
          setLoadingNextPage(true);
        } else {
          setLoadingFirstActivities(true);
        }

        const data = await getActivities(fetchOptions);
        setActivities((prev) => {
          if (!append) return data.results;

          const ids = new Set(prev.map((a) => a.id));
          return [...prev, ...data.results.filter((a) => !ids.has(a.id))];
        });

        setNextPage(data.next);
      } catch (err) {
        console.error(err);
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(
          'Hey! Looks like the backend is asleep 😴. Give it a nudge by visiting this link, it’ll be ready in a few minutes.'
        );
      } finally {
        if (append) {
          setLoadingNextPage(false);
        } else {
          setLoadingFirstActivities(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    const filtersAreDefault =
      filters.minPeople === DEFAULT_FILTERS.minPeople &&
      filters.maxPeople === DEFAULT_FILTERS.maxPeople &&
      filters.categories.length === 0 &&
      filters.distance === DEFAULT_FILTERS.distance;

    if (filtersAreDefault) {
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (abortRef.current) abortRef.current.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      const applyFilters = async () => {
        fetchActivities({
          filters,
          signal: controller.signal,
        });
      };

      applyFilters();
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchActivities, filters]);

  const loadMore = useCallback(async () => {
    if (!nextPage || loadingNextPage) return;

    fetchActivities(
      {
        url: nextPage,
      },
      true
    );
  }, [nextPage, loadingNextPage, fetchActivities]);

  return {
    activities,
    loadingFirstActivities,
    loadingNextPage,
    nextPage,
    loadMore,
    filters,
    setFilters,
    error,
  };
};
