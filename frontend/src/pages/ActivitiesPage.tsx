import { useEffect, useState } from "react";
import { getActivities, Activity } from "../api/activities";

export const ActivitiesPage = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getActivities().then(data => {
            setActivities(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Cargando actividades...</p>;

    return (
        <div>
            <h1>Team Building Activities</h1>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        <h2>{activity.title}</h2>
                        <img src={activity.image_url} alt={activity.title} width={200} />
                        <p>{activity.description}</p>
                        <p>For {activity.min_people} - {activity.max_people} people</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
