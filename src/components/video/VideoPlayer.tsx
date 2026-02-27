import { useRef, useState, useEffect } from "react";
import { useFrameStepper } from "@/hooks/useFrameStepper";
import PlaybackControls from "./PlaybackControls";
import VideoUploader from "./VideoUploader";

interface VideoPlayerProps {
  label?: string;
}

const VideoPlayer = ({ label }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const {
    isPlaying,
    currentTime,
    duration,
    speed,
    volume,
    speedOptions,
    togglePlayPause,
    advanceFrame,
    changeSpeed,
    changeVolume,
    seek,
  } = useFrameStepper(videoRef);

  // Clean up Object URL on unmount or source change
  useEffect(() => {
    return () => {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
  }, [videoSrc]);

  const handleVideoSelected = (url: string, name: string) => {
    if (videoSrc) URL.revokeObjectURL(videoSrc);
    setVideoSrc(url);
    setFileName(name);
  };

  if (!videoSrc) {
    return (
      <div>
        {label && (
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">{label}</h3>
        )}
        <VideoUploader onVideoSelected={handleVideoSelected} />
      </div>
    );
  }

  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">{fileName}</span>
        </div>
      )}

      {/* Video element */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          className="h-full w-full"
          onClick={togglePlayPause}
          playsInline
        />
        {/* Play/pause indicator overlay */}
        {!isPlaying && duration > 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            onClick={togglePlayPause}
          >
            <div className="rounded-full bg-black/50 p-4">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Playback controls */}
      <div className="mt-3">
        <PlaybackControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          speed={speed}
          speedOptions={speedOptions}
          volume={volume}
          onTogglePlayPause={togglePlayPause}
          onAdvanceFrame={advanceFrame}
          onChangeSpeed={changeSpeed}
          onSeek={seek}
          onVolumeChange={changeVolume}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
