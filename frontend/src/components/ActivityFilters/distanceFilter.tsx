import { Slider } from '@/components/ui/slider';
import Location from './../../assets/location.svg?react';
import { DEFAULT_FILTERS } from '@/hooks/useActivities';

interface DistanceFilterProps {
  distanceFilter: number;
  setDistanceFilter: (value: number) => void;
}

const formatDistance = (distance: number) => {
  return `${distance / 1000} km`;
};

export const DistanceFilter = ({
  distanceFilter,
  setDistanceFilter,
}: DistanceFilterProps) => {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-medium">Distance (from office)</p>
      <div className="flex items-center gap-2 pb-3">
        <Location className="inline-block h-5 w-5" />
        <Slider
          value={[distanceFilter]}
          onValueChange={(newValues: [number]) =>
            setDistanceFilter(newValues[0])
          }
          min={0}
          max={DEFAULT_FILTERS.distance}
          step={1}
          label={formatDistance(distanceFilter)}
        />
      </div>
    </div>
  );
};
