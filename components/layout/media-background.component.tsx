"use client";
import { useRef } from "react";

type MediaBackgroundProps = {
  video: string;
};

export const MediaBackground = ({ video }: MediaBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      className="body-overlay"
      muted
      autoPlay
      loop
      style={{ opacity: 0.1 }}
      ref={videoRef}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
};
