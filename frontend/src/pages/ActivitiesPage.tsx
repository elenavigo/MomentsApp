import { useEffect, useState } from "react";
import { getActivities, type Activity } from "../api/activities";
import { ActivityCard } from "./ActivityCard";

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

    if (loading) return <p className="text-center mt-10">Loading activities...</p>;

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <h3 className="text-3xl font-bold mb-8">Team Building Activities</h3>
            
            <ul className="grid gap-6">
                {activities.map(activity => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))}
            </ul>
        </div>
    );
};
