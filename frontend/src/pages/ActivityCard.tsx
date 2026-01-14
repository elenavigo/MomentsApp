import { type Activity } from "../api/activities";

const categoryTypeColors: Record<string, string> = {
    "adventure": "bg-green-100 text-green-800",
    "corporate": "bg-yellow-100 text-yellow-800",
    "gastronomy": "bg-purple-100 text-purple-800",
    "learning": "bg-blue-100 text-blue-800",
    "creative": "bg-pink-100 text-pink-800",
}

export const ActivityCard = ( { activity}: { activity: Activity } ) => {
    return (
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
                <span className={`inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2 w-fit ${categoryTypeColors[activity.category] || 'bg-gray-100 text-gray-800'}`}>
                    {activity.category}
                </span>
                <div>
                    <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                </div>
                <p className="text-gray-500 text-sm">
                    For {activity.min_people} - {activity.max_people} people
                </p>
            </div>
        </li>
    );
};
