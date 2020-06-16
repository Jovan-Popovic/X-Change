import React from "react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Slide1 from "../img/slide1.png"
import Slide2 from "../img/slide2.png"
import Slide3 from "../img/slide3.png"


 
class SimpleSlider extends React.Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div>
          <img className="slide-img" src={Slide1} alt="Slide1" />;
        </div>
        <div>
          <img className="slide-img" src={Slide2} alt="Slide2" />;
        </div>
        <div>
          <img className="slide-img" src={Slide3} alt="Slide3" />;
        </div>
      </Slider>
    );
  }
}


export const Home = () => {
  return (
  <div>
    <SimpleSlider />
  </div>
  );
};
