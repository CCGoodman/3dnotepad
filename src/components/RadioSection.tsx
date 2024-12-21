import { Radio, Music2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { RadioStation } from '@/lib/radio';

interface RadioSectionProps {
  radioEnabled: boolean;
  volume: number;
  currentStation: string | null;
  onToggleRadio: () => void;
  onVolumeChange: (value: number[]) => void;
  onStationChange: (stationId: string) => void;
  stations: RadioStation[];
}

export function RadioSection({
  radioEnabled,
  volume,
  currentStation,
  onToggleRadio,
  onVolumeChange,
  onStationChange,
  stations
}: RadioSectionProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={onToggleRadio}
        className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
      >
        <div className="flex items-center space-x-2">
          <Radio className="h-4 w-4" />
          <span>Background Radio</span>
        </div>
        <span className="text-xs text-white/70">
          {radioEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </button>

      {radioEnabled && (
        <>
          <div className="px-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Music2 className="h-4 w-4" />
              <span className="text-sm">Volume</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={onVolumeChange}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>

          <ScrollArea className="h-[200px] px-4">
            <div className="space-y-1 pr-4">
              {stations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => onStationChange(station.id)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-white/10",
                    currentStation === station.id && "bg-white/20"
                  )}
                >
                  <div className="flex flex-col">
                    <span>{station.name}</span>
                    <span className="text-xs text-white/50">{station.genre}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}