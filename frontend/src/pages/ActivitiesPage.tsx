import { useEffect, useState } from "react";
import { getActivities, type Activity } from "../api/activities";

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

    if (loading) return <p className="text-center mt-10">Cargando actividades...</p>;

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <h3 className="text-3xl font-bold mb-8">Team Building Activities</h3>
            
            <ul className="grid gap-6">
                {activities.map(activity => (
                    <li
                        key={activity.id}
                        className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="md:w-1/3">
                            <img
                                src={activity.image_url}
                                alt={activity.title}
                                className="object-cover w-full h-48 md:h-full"
                            />
                        </div>
                        <div className="p-6 flex flex-col justify-between md:w-2/3">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
                                <p className="text-gray-600 mb-4">{activity.description}</p>
                            </div>
                            <p className="text-gray-500 text-sm">
                                For {activity.min_people} - {activity.max_people} people
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
