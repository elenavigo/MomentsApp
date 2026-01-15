import { type Activity } from '../api/activities';

const categoryTypeColors: Record<string, string> = {
  adventure: 'bg-green-100 text-green-800',
  corporate: 'bg-yellow-100 text-yellow-800',
  gastronomy: 'bg-purple-100 text-purple-800',
  learning: 'bg-blue-100 text-blue-800',
  creative: 'bg-pink-100 text-pink-800',
};

export const ActivityCard = ({ activity }: { activity: Activity }) => {
  return (
    <li className="group bg-white rounded-2xl shadow-sm shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="relative h-48">
        <img
          src={activity.image_url}
          alt={activity.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />

        <span
          className={`absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full ${
            categoryTypeColors[activity.category] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {activity.category}
        </span>
      </div>

      <div className="p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">{activity.title}</h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {activity.description}
        </p>

        <div className="mt-auto flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Ideal for {activity.min_people}–{activity.max_people} people
          </span>

          <span className="font-medium group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </li>
  );
};
