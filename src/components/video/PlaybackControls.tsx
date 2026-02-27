import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { formatTime } from "@/hooks/useFrameStepper";
import { cn } from "@/lib/utils";

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: number;
  speedOptions: readonly number[];
  onTogglePlayPause: () => void;
  onAdvanceFrame: (direction: 1 | -1) => void;
  onChangeSpeed: (speed: number) => void;
  onSeek: (time: number) => void;
}

const PlaybackControls = ({
  isPlaying,
  currentTime,
  duration,
  speed,
  speedOptions,
  onTogglePlayPause,
  onAdvanceFrame,
  onChangeSpeed,
  onSeek,
}: PlaybackControlsProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(fraction * duration);
  };

  return (
    <div className="space-y-2">
      {/* Scrubber */}
      <div
        className="group relative h-2 cursor-pointer rounded-full bg-muted"
        onClick={handleScrub}
      >
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>

      {/* Time display */}
      <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        {/* Transport controls */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onAdvanceFrame(-1)} title="Previous frame">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onTogglePlayPause} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onAdvanceFrame(1)} title="Next frame">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed buttons */}
        <div className="flex items-center gap-1">
          {speedOptions.map((s) => (
            <Button
              key={s}
              variant={speed === s ? "default" : "ghost"}
              size="sm"
              className={cn("h-7 px-2 text-xs", speed === s && "pointer-events-none")}
              onClick={() => onChangeSpeed(s)}
            >
              {s}x
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;
