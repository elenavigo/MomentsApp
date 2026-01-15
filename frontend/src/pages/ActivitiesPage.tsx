import { useEffect, useState } from 'react';
import { getActivities, type Activity } from '../api/activities';
import { ActivityCard } from './ActivityCard';

export const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiess = await getActivities();
      setActivities(activitiess);
      setLoading(false);
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Finding great moments for your team…
      </p>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <span className="text-2xl font-medium uppercase tracking-wide">
        Moments
      </span>

      <p className="text-gray-600 mt-2 mb-10 max-w-2xl">
        Great teams are built through shared moments. Discover simple, memorable
        activities for your team. Just a couple of clicks away.
      </p>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </ul>
    </div>
  );
};
