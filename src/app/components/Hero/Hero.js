"use client";

import HeroCarousel from "./HeroCarouselImg.js";
import "./Hero.css";
import { useState } from "react";

// Local image paths stored in /public
const images = ["/hero1.jpeg", "/hero2.jpeg", "/hero3.jpeg"];
const numOfCarousel = images.length;

export default function Hero() {
  const [pos, setPos] = useState(0);

  return (
    <div className="hero">
      <div className="heroContent">
        <h1>
          Find the <i>Best Insurance</i> plans for your needs
        </h1>
        <h1>
          तपाईँको आवश्यकता अनुसार <i>उचित बीमा योजना</i> खोज्नुहोस्।
        </h1>
        <a href="/comparison">
          <button className="mainButton">Compare Now</button>
        </a>
      </div>

      <div className="heroAdvert">
        <div className="heroCarousel">
          {/* Dynamically render images */}
          {images.map((image, index) => (
            <HeroCarousel key={index} pos={index - pos} imageSrc={image} />
          ))}

          {/* Previous Button */}
          <span
            id="heroAdventPrev"
            onClick={() => setPos((prevPos) => (prevPos === 0 ? numOfCarousel - 1 : prevPos - 1))}
          >
            ￩
          </span>

          {/* Next Button */}
          <span
            id="heroAdventNext"
            onClick={() => setPos((prevPos) => (prevPos + 1) % numOfCarousel)}
          >
            ￫
          </span>
        </div>

        {/* Carousel Index Indicators */}
        <span className="heroCarouselIndex">
          {images.map((_, i) => (
            <span
              key={i}
              className={`heroCarouselIndexBalls ${i === pos ? "activeCarouselIndex" : ""}`}
              onClick={() => setPos(i)}
            ></span>
          ))}
        </span>
      </div>
    </div>
  );
}


// "use client";

// import HeroCarousel from "./HeroCarouselImg.js";
// import "./Hero.css";
// import { useState } from "react";

// const numOfCarousel = 3;
// const carouselIndex = new Array(numOfCarousel).fill(0).map((_, i) => i);

// export default function Hero() {
//   const [pos, setPos] = useState(0);
//   const carouselIndexEl = carouselIndex.map((i) => {
//     return (
//       <span
//         id={`carouselIndex` + i}
//         key={i}
//         className={
//           "heroCarouselIndexBalls " + (i === pos ? "activeCarouselIndex" : "")
//         }
//         onClick={(e) => {
//           setPos(i);
//           Array.from(e.target.parentElement.children).forEach((e_ch) => {
//             e_ch.classList.remove("activeCarouselIndex");
//           });
//           e.target.classList.add("activeCarouselIndex");
//         }}
//       ></span>
//     );
//   });
//   return (
//     <div className="hero">
//       <div className="heroContent">
//         <h1>
//           Find the <i>Best Insurance</i> plans for your needs
//         </h1>
//         <h1>
//           तपाईँको आवश्यकता अनुसार <i>उचित बीमा योजना</i> खोज्नुहोस्।
//         </h1>
//         <a href="/comparison"><button className="mainButton" >Compare Now</button></a>
//       </div>
//       <div className="heroAdvert">
//         <div className="heroCarousel">
//           <HeroCarousel pos={0 - pos} />
//           <HeroCarousel pos={1 - pos} />
//           <HeroCarousel pos={2 - pos} />
//           <span
//             id="heroAdventPrev"
//             onClick={() => {
//               if (pos === 0) {
//                 setPos(numOfCarousel - 1);
//                 return;
//               }
//               return setPos((prevPos) => prevPos - 1);
//             }}
//           >
//             ￩
//           </span>
//           <span
//             id="heroAdventNext"
//             onClick={() => {
//               if (pos === numOfCarousel - 1) {
//                 setPos(0);
//                 return;
//               }
//               setPos((prevPos) => prevPos + 1);
//             }}
//           >
//             ￫
//           </span>
//         </div>
//         <span className="heroCarouselIndex">{carouselIndexEl}</span>
//       </div>
//     </div>
//   );
// }
