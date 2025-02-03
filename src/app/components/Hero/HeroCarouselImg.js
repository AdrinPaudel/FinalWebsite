"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./Hero.css";

export default function HeroCarouselImg({ pos = 0, imageSrc }) {
  const [carouselSize, setCarouselSize] = useState({
    width: Math.floor(window.innerWidth * 0.4),
    height: Math.floor(window.innerWidth * 0.2),
  });

  useEffect(() => {
    const updateSize = () => {
      setCarouselSize({
        width: Math.floor(window.innerWidth * 0.4),
        height: Math.floor(window.innerWidth * 0.2),
      });
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="heroCarouselItem"
      style={{ transform: `translate(${pos * 100}%, 0%)` }}
    >
      <Image
        src={imageSrc} // Use local images
        alt="carousel_image"
        width={carouselSize.width}
        height={carouselSize.height}
      />
      <div className="heroCarouselItemIndex">{pos + 1}</div>
    </div>
  );
}


// "use client";

// import Image from "next/image";
// import "./Hero.css";
// import { useEffect, useState } from "react";

// export default function HeroCarouselImg(props) {
//   const [carouselSizeWidth, setCarouselSizeWidth] = useState(0);
//   const [carouselSizeHeight, setCarouselSizeHeight] = useState(0);
//   useEffect(() => {
//     setCarouselSizeWidth(Math.floor(window.innerWidth * 0.4));
//     setCarouselSizeHeight(Math.floor(window.innerWidth * 0.2));
//   }, []);

//   return (
//     <div
//       className="heroCarouselItem"
//       style={{ transform: `translate(${props.pos * 100}%, 0%)` }}
//     >
//       <Image
//         src={`https://picsum.photos/${carouselSizeWidth}/${carouselSizeHeight}?grayscale&random=1`}
//         alt="advert_item"
//         width={carouselSizeWidth}
//         height={carouselSizeHeight}
//       />
//       <div className="heroCarouselItemIndex">1</div>
//     </div>
//   );
// }
