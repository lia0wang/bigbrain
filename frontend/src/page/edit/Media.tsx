import React from 'react';

interface MediaProps {
  url: string;
}

const Media: React.FC<MediaProps> = ({ url }) => {
  const isVideo = url.includes('youtube.com');
  return (
    <div>
      {isVideo
        ? (
        <iframe
          width='560'
          height='315'
          src={url}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
          )
        : (
        <img src={url} alt='uploaded photo' />
          )}
    </div>
  );
};

export default Media;
