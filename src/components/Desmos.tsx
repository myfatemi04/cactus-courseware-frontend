import React from "react";

const Desmos = ({ link } : {link : string}) => (
  <div className="desmos-responsive">
    <iframe
      width="853"
      height="480"
      src={`${link}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Desmos"
    />
  </div>
);


export default Desmos;