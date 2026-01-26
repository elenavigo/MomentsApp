import { useState } from 'react';
import { ActivityContent } from './ActivityContent';
import { ActivityBadge } from './ActivityBadge';
import type { ActivityItem } from './types';

export const ActivityCard = ({ activity }: { activity: ActivityItem }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <li
      className={`flex flex-col justify-between group bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer ${
        imageLoaded && 'animate-fadeIn'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          loading="lazy"
          src={activity.image_url}
          alt={activity.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />

        {imageLoaded ? (
          <ActivityBadge category={activity.category} />
        ) : (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-semibold tracking-wide uppercase bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
            Coming soon
          </span>
        </div>
      </div>

      {imageLoaded && <ActivityContent activity={activity} />}
    </li>
  );
};
