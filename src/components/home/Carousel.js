import React from "react";
import Slider from "react-slick";
import { CarouselWrapper } from "./CarouselWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Carousel = () => {
  const [carouselProps] = React.useState({
    dots: true,
    arrows: true,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "carousel",
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  });

  return (
    <CarouselWrapper className="column is-9">
      <Slider {...carouselProps}>
        <div>
          <img
            className="slide-img"
            src={require("../../img/slide1.png")}
            alt="Slide1"
          />
        </div>
        <div>
          <img
            className="slide-img"
            src={require("../../img/slide2.png")}
            alt="Slide2"
          />
        </div>
        <div>
          <img
            className="slide-img"
            src={require("../../img/slide3.png")}
            alt="Slide3"
          />
        </div>
      </Slider>
    </CarouselWrapper>
  );
};
