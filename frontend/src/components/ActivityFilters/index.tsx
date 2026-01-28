import { useEffect, useRef, useState } from 'react';
import { PeopleFilter } from './peopleFilter';
import { CategoriesFilters } from './categoriesFilter';
import { DistanceFilter } from './distanceFilter';
import { cn } from '@/lib/utils';

interface ActivityFiltersProps {
  categoriesFilter: string[];
  minPeopleFilter: number;
  maxPeopleFilter: number;
  distanceFilter: number;
  setCategoriesFilter: (value: string[]) => void;
  setMinPeopleFilter: (value: number) => void;
  setMaxPeopleFilter: (value: number) => void;
  setDistanceFilter: (value: number) => void;
}

export const ActivityFilters = ({
  categoriesFilter,
  minPeopleFilter,
  maxPeopleFilter,
  distanceFilter,
  setCategoriesFilter,
  setMinPeopleFilter,
  setMaxPeopleFilter,
  setDistanceFilter,
}: ActivityFiltersProps) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          open && 'bg-white! rounded-b-none! shadow-lg',
          'text-md font-medium text-gray-800 hover:text-black transition px-8!'
        )}
      >
        Filters
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute left-0 w-full md:w-120 rounded-b-xl rounded-tr-xl bg-white shadow-lg p-5 z-50 flex gap-5"
        >
          <div className="w-[40%]">
            <CategoriesFilters
              categoriesFilter={categoriesFilter}
              setCategoriesFilter={setCategoriesFilter}
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <DistanceFilter
              distanceFilter={distanceFilter}
              setDistanceFilter={setDistanceFilter}
            />
            <PeopleFilter
              minPeopleFilter={minPeopleFilter}
              maxPeopleFilter={maxPeopleFilter}
              setMinPeopleFilter={setMinPeopleFilter}
              setMaxPeopleFilter={setMaxPeopleFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
};
