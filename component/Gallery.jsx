import React from "react";
import "./Gallery.css";
import img from '../src/assets/113632856_p0_master1200.jpg'

const Gallery = () => {
  const images = [
    img,
    img,
    img,
    img,
    img,];

  return (
    <div>
      <div className="list">
        {images.map((img, index) => (
          <div key={index} className="items">
            <img src={img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
