import React from "react";

const Video = ({ link } : {link : string}) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`${link}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="video"
    />
  </div>
);


export default Video;