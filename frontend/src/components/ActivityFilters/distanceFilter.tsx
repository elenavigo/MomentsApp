import { Slider } from '@/components/ui/slider';
import Location from './../../assets/location.svg?react';

interface DistanceFilterProps {
  distanceFilter: number;
  setDistanceFilter: (value: number) => void;
}

export const DistanceFilter = ({
  distanceFilter,
  setDistanceFilter,
}: DistanceFilterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium">Distance (km from office)</p>
      <div className="flex items-center gap-2 pb-3">
        <Location className="inline-block h-5 w-5" />
        <Slider
          value={[distanceFilter]}
          onValueChange={(newValues: [number]) =>
            setDistanceFilter(newValues[0])
          }
          min={0}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
};
