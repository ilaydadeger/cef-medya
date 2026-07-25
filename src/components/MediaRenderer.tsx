import React from 'react';

interface MediaRendererProps extends React.ImgHTMLAttributes<HTMLImageElement | HTMLVideoElement> {
  src: string;
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({ src, className, alt, ...props }) => {
  if (!src) return null;

  const isVideo = src.match(/\.(mp4|webm|ogg|mov)$/i);

  if (isVideo) {
    return (
      <video
        src={src}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        {...(props as any)}
      />
    );
  }

  return (
    <img
      src={src}
      className={className}
      alt={alt || "Media"}
      {...(props as any)}
    />
  );
};
