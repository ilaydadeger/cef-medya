import React from "react"

interface MediaRendererProps
  extends React.ImgHTMLAttributes<HTMLImageElement | HTMLVideoElement> {
  src: string
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({
  src,
  className,
  alt,
  ...props
}) => {
  if (!src) return null

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeId = getYoutubeId(src)
  if (youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  const isVideo = src.match(/\.(mp4|webm|ogg|mov)$/i)

  if (isVideo) {
    return (
      <video
        src={src}
        className={className}
        controls
        playsInline
        {...props as any}
      />
    )
  }

  return (
    <img
      src={src}
      className={className}
      alt={alt || "Media"}
      {...props as any}
    />
  )
}
