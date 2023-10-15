import React, { useState } from "react";
import ImageSkelaton from "../ImageSkelaton/index";
const LazyImage = ({ src, bg, imgStyle, divStyle, skelatonStyle, onClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`${divStyle} w-full transition-all duration-500 relative`}>
      <img
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        src={src}
        className={` ${imgStyle} w-full transition-all duration-500 ${
          imgLoaded ? "opacity-100" : "opacity-0 "
        }`}
        onClick={onClick}
      />
      <div
        className={`${
          imgLoaded ? "opacity-0 hidden" : "opacity-100"
        } transition-all duration-500 w-full absolute top-0`}
      >
        <ImageSkelaton otherStyle={skelatonStyle} />
      </div>
    </div>
  );
};

export default LazyImage;
