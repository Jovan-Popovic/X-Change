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
    <CarouselWrapper>
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

/*     <section className="hero is-medium has-carousel">
      <div id="carousel" className="hero-carousel">
        <div className="item-1">
          <img
            className="slide-img"
            src={require("../../img/slide1.png")}
            alt="Slide1"
          />
        </div>
        <div className="item-2">
          <img
            className="slide-img"
            src={require("../../img/slide2.png")}
            alt="Slide2"
          />
        </div>
        <div className="item-3">
          <img
            className="slide-img"
            src={require("../../img/slide3.png")}
            alt="Slide3"
          />
        </div>
      </div>
      <div className="hero-head"></div>
      <div className="hero-body"></div>
      <div className="hero-foot"></div>
      {bulmaCarousel.attach("#carousel", {
        slidesToScroll: 1,
        slidesToShow: 4,
      })}
    </section> */
