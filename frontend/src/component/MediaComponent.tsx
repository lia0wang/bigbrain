
import React from 'react';
import YouTube from 'react-youtube';

type MediaComponentProps = {
  media: string;
};

const MediaComponent: React.FC<MediaComponentProps> = ({ media }) => {
  const isYoutubeLink = (url: string) => {
    const regex = /^.*youtube.*$/;
    return regex.test(url);
  };

  if (isYoutubeLink(media)) {
    const videoId = new URLSearchParams(new URL(media).search).get('v');

    const opts = {
      width: '220',
      height: '220',
    };

    return <YouTube videoId={videoId} opts={opts} />;
  } else {
    return (
      <img
        className="md:w-[220px] md:h-[220px] object-cover rounded-lg mt-4"
        src={media}
        alt="media"
      />
    );
  }
};

export default MediaComponent;
