import { useEffect, useRef, useState } from 'react';
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandItem,
} from '@/components/ui/command';
import { PeopleFilter } from './peopleFilter';

interface CategoriesFilterProps {
  categoriesFilter: string[];
  setCategoriesFilter: (value: string[]) => void;
}

const categories = [
  'adventure',
  'corporate',
  'gastronomy',
  'learning',
  'creative',
];

export const CategoriesFilters = ({
  categoriesFilter,
  setCategoriesFilter,
}: CategoriesFilterProps) => {
  return (
    <div className="mb-5">
      <p className="text-sm font-medium mb-2">Categories</p>

      <Command className="border rounded-md bg-white">
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {categories.map((cat) => (
            <CommandItem
              key={cat}
              onSelect={() => {
                setCategoriesFilter(
                  categoriesFilter.includes(cat)
                    ? categoriesFilter.filter((c) => c !== cat)
                    : [...categoriesFilter, cat]
                );
              }}
            >
              <span className="flex-1 capitalize">{cat}</span>
              {categoriesFilter.includes(cat) && '✓'}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};
