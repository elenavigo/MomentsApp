import { DualRangeSlider } from '../ui/dualRangeSlider';

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
    <div className="flex flex-col gap-8">
      <p className="text-sm font-medium">People</p>
      <div className="flex items-center gap-2 pb-3">
        <DualRangeSlider
          value={[minPeopleFilter, maxPeopleFilter]}
          onValueChange={(newValues: [number, number]) => {
            setMinPeopleFilter(newValues[0]);
            setMaxPeopleFilter(newValues[1]);
          }}
          min={2}
          max={40}
          step={1}
          label={(value) => <span className="text-sm">{value}</span>}
        />
      </div>
    </div>
  );
};
