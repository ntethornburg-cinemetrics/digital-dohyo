import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { formatTime } from "@/hooks/useFrameStepper";
import { cn } from "@/lib/utils";

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: number;
  speedOptions: readonly number[];
  volume: number;
  onTogglePlayPause: () => void;
  onAdvanceFrame: (direction: 1 | -1) => void;
  onChangeSpeed: (speed: number) => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

const PlaybackControls = ({
  isPlaying,
  currentTime,
  duration,
  speed,
  speedOptions,
  volume,
  onTogglePlayPause,
  onAdvanceFrame,
  onChangeSpeed,
  onSeek,
  onVolumeChange,
}: PlaybackControlsProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const scrubberRef = useRef<HTMLDivElement>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const prevVolume = useRef(volume);

  const seekFromEvent = useCallback(
    (clientX: number) => {
      const el = scrubberRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onSeek(fraction * duration);
    },
    [duration, onSeek],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsScrubbing(true);
      seekFromEvent(e.clientX);

      const handleMouseMove = (ev: MouseEvent) => seekFromEvent(ev.clientX);
      const handleMouseUp = () => {
        setIsScrubbing(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [seekFromEvent],
  );

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(prevVolume.current || 1);
      setIsMuted(false);
    } else {
      prevVolume.current = volume;
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="space-y-2">
      {/* Scrubber */}
      <div
        ref={scrubberRef}
        className={cn(
          "group relative h-2 cursor-pointer rounded-full bg-muted select-none",
          isScrubbing && "cursor-grabbing",
        )}
        onMouseDown={handleMouseDown}
      >
        <div
          className="h-full rounded-full bg-primary pointer-events-none"
          style={{ width: `${progress}%` }}
        />
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary pointer-events-none transition-opacity",
            isScrubbing ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
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

        {/* Volume */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              onVolumeChange(v);
              setIsMuted(v === 0);
            }}
            className="h-1 w-20 cursor-pointer accent-primary"
          />
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
