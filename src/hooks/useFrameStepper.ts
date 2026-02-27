import { useCallback, useEffect, useRef, useState } from "react";

const FRAME_RATE = 30;
const FRAME_DURATION = 1 / FRAME_RATE;

const SPEED_OPTIONS = [0.25, 0.5, 1, 2] as const;
type Speed = (typeof SPEED_OPTIONS)[number];

export function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

/**
 * @param videoRef - ref to the <video> element
 * @param src - current video source URL (pass so effects re-run on source change)
 */
export function useFrameStepper(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  src: string | null,
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<Speed>(1);
  const [volume, setVolume] = useState(1);
  const animationRef = useRef<number>(0);

  // Sync time display with video during playback
  const updateTime = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
    animationRef.current = requestAnimationFrame(updateTime);
  }, [videoRef]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationRef.current);
  }, [updateTime]);

  // Reset state and re-attach listeners when source changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) {
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      return;
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration);
      setCurrentTime(0);
    };
    const onEnded = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);

    // If metadata already loaded (cached / fast load)
    if (video.readyState >= 1) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, [videoRef, src]);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [videoRef]);

  const advanceFrame = useCallback(
    (direction: 1 | -1) => {
      const video = videoRef.current;
      if (!video) return;

      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }

      const frameStep = FRAME_DURATION * direction;
      const newTime = Math.max(0, Math.min(video.currentTime + frameStep, video.duration));
      video.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [videoRef],
  );

  const changeSpeed = useCallback(
    (newSpeed: number) => {
      const video = videoRef.current;
      if (video) {
        video.playbackRate = newSpeed;
      }
      setSpeed(newSpeed as Speed);
    },
    [videoRef],
  );

  const changeVolume = useCallback(
    (newVolume: number) => {
      const video = videoRef.current;
      if (video) {
        video.volume = newVolume;
      }
      setVolume(newVolume);
    },
    [videoRef],
  );

  const seek = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      const clamped = Math.max(0, Math.min(time, video.duration));
      video.currentTime = clamped;
      setCurrentTime(clamped);
    },
    [videoRef],
  );

  return {
    isPlaying,
    currentTime,
    duration,
    speed,
    volume,
    speedOptions: SPEED_OPTIONS,
    togglePlayPause,
    advanceFrame,
    changeSpeed,
    changeVolume,
    seek,
  };
}
