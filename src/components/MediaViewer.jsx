import React from 'react';

/**
 * Parses YouTube video ID from various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`
    : null;
}

/**
 * Parses Vimeo video ID
 */
export function getVimeoEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : null;
}

export function isDirectVideoUrl(url) {
  if (!url) return false;
  const cleanUrl = url.toLowerCase().split('?')[0];
  return (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.ogg') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.includes('/video/upload/') ||
    (cleanUrl.includes('supabase.co/storage/v1/object/public/') && (cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm')))
  );
}

export default function MediaViewer({
  url,
  alt = 'Ejercicio',
  className = '',
  autoPlay = true,
  controls = false,
  fallbackImage = '/assets/images/squat.png'
}) {
  if (!url) {
    return (
      <img
        src={fallbackImage}
        alt={alt}
        className={className}
      />
    );
  }

  const ytEmbed = getYouTubeEmbedUrl(url);
  if (ytEmbed) {
    return (
      <div className={`media-viewer-embed-wrap ${className}`}>
        <iframe
          src={ytEmbed}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="media-viewer-iframe"
        />
      </div>
    );
  }

  const vimeoEmbed = getVimeoEmbedUrl(url);
  if (vimeoEmbed) {
    return (
      <div className={`media-viewer-embed-wrap ${className}`}>
        <iframe
          src={vimeoEmbed}
          title={alt}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="media-viewer-iframe"
        />
      </div>
    );
  }

  if (isDirectVideoUrl(url) || url.includes('video')) {
    return (
      <video
        src={url}
        autoPlay={autoPlay}
        loop
        muted={!controls}
        controls={controls}
        playsInline
        className={className}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = fallbackImage;
      }}
    />
  );
}
