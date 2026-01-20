import { useEffect, useRef, useState } from 'react';
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandItem,
} from '@/components/ui/command';
import { PeopleFilter } from './peopleFilter';
import { CategoriesFilters } from './categoriesFilter';

interface ActivityFiltersProps {
  categoriesFilter: string[];
  minPeopleFilter: number;
  maxPeopleFilter: number;
  setCategoriesFilter: (value: string[]) => void;
  setMinPeopleFilter: (value: number) => void;
  setMaxPeopleFilter: (value: number) => void;
}

const categories = [
  'adventure',
  'corporate',
  'gastronomy',
  'learning',
  'creative',
];

export const ActivityFilters = ({
  categoriesFilter,
  minPeopleFilter,
  maxPeopleFilter,
  setCategoriesFilter,
  setMinPeopleFilter,
  setMaxPeopleFilter,
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
        className="text-sm font-medium text-gray-700 hover:text-black transition"
      >
        Filters
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute left-0 mt-3 w-80 rounded-xl bg-gray-100 shadow-lg p-4 z-50"
        >
          <CategoriesFilters
            categoriesFilter={categoriesFilter}
            setCategoriesFilter={setCategoriesFilter}
          />
          <PeopleFilter
            minPeopleFilter={minPeopleFilter}
            maxPeopleFilter={maxPeopleFilter}
            setMinPeopleFilter={setMinPeopleFilter}
            setMaxPeopleFilter={setMaxPeopleFilter}
          />
        </div>
      )}
    </div>
  );
};
