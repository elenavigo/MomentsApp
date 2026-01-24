import { useCallback, useEffect, useRef, useState } from 'react';
import { getActivities, type Activity } from '../../api/activities';
import { ActivityCard } from '../../components/ActivityCard';
import { ActivityFilters } from '../../components/ActivityFilters';

export const ActivitiesList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [minPeopleFilter, setMinPeopleFilter] = useState(2);
  const [maxPeopleFilter, setMaxPeopleFilter] = useState(40);
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState<number>(100);

  const loadMore = useCallback(async () => {
    if (!nextPage) return;

    setLoadingMore(true);

    const data = await getActivities(nextPage);
    setActivities((prev) => [...prev, ...data.results]);
    setNextPage(data.next);

    setLoadingMore(false);
  }, [nextPage]);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities();
      setActivities(data.results);
      setNextPage(data.next);
      setLoading(false);
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      const hasScrolledToBottom =
        scrollTop + clientHeight >= scrollHeight - 100;

      if (hasScrolledToBottom) loadMore();
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () =>
      containerRef.current?.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (abortRef.current) abortRef.current.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      const applyFilters = async () => {
        try {
          setLoading(true);
          const data = await getActivities(
            undefined,
            {
              min_people: minPeopleFilter,
              max_people: maxPeopleFilter,
              categories: categoriesFilter,
            },
            controller.signal
          );

          setActivities(data.results);
        } catch (err) {
          if ((err as any).name === 'AbortError') {
            console.log('Request aborted');
          } else {
            console.error(err);
          }
        }

        setLoading(false);
        setLoadingMore(false);
      };

      applyFilters();
    }, 1500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [minPeopleFilter, maxPeopleFilter, categoriesFilter]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Finding great moments for your team…
      </p>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 pb-20" ref={containerRef}>
      <span className="text-2xl font-medium uppercase tracking-wide">
        Moments
      </span>

      <p className="text-gray-600 mt-2 mb-10 max-w-2xl">
        Great teams are built through shared moments. Discover simple, memorable
        activities for your team. Just a couple of clicks away.
      </p>

      <ActivityFilters
        minPeopleFilter={minPeopleFilter}
        maxPeopleFilter={maxPeopleFilter}
        setMinPeopleFilter={setMinPeopleFilter}
        setMaxPeopleFilter={setMaxPeopleFilter}
        categoriesFilter={categoriesFilter}
        setCategoriesFilter={setCategoriesFilter}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
        {activities?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </ul>
      {loadingMore && (
        <div className="flex justify-center mt-6">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
