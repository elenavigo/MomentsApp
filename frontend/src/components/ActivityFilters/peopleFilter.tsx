import { DualRangeSlider } from '../ui/dualRangeSlider';
import People from './../../assets/users.svg?react';

interface PeopleFilterProps {
  minPeopleFilter: number;
  maxPeopleFilter: number;
  setMinPeopleFilter: (value: number) => void;
  setMaxPeopleFilter: (value: number) => void;
}

export const PeopleFilter = ({
  minPeopleFilter,
  maxPeopleFilter,
  setMinPeopleFilter,
  setMaxPeopleFilter,
}: PeopleFilterProps) => {
  return (
    <div className="py-5 flex gap-2 items-center">
      <People className="inline-block h-5 w-5" />
      <div className="w-48">
        <DualRangeSlider
          label={(value) => <span>{value}</span>}
          value={[minPeopleFilter, maxPeopleFilter]}
          onValueChange={(newValues: [number, number]) => {
            setMinPeopleFilter(newValues[0]);
            setMaxPeopleFilter(newValues[1]);
          }}
          min={2}
          max={40}
          step={1}
        />
      </div>
    </div>
  );
};
