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
    speed: 300,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "carousel",
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  });
  const images = ["slide1.png", "slide2.png", "slide3.png", "slide4.png"];

  return (
    <CarouselWrapper>
      <Slider {...carouselProps}>
        {images.map((image, index) => (
          <img
            key={index}
            className="slide-img"
            src={require(`../../img/${image}`)}
            alt="Slide1"
          />
        ))}
      </Slider>
    </CarouselWrapper>
  );
};
