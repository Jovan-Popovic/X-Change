import React from "react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Slide1 from "../img/slide1.png"
import Slide2 from "../img/slide2.png"
import Slide3 from "../img/slide3.png"

import Select from "react-dropdown-select";
import { place } from "./SearchItem.js";
import { subject } from "./SearchItem.js";


 
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
          <img className="slide-img" src={Slide1} alt="Slide1" />
        </div>
        <div>
          <img className="slide-img" src={Slide2} alt="Slide2" />
        </div>
        <div>
          <img className="slide-img" src={Slide3} alt="Slide3" />
        </div>
      </Slider>
    );
  }
}

class SrcByName extends React.Component {
  render() {
    return(
      <div className="field has-addons">
        <div className="control">
          <input class="input" type="text" placeholder="Search by Name" />
        </div>
      <div className="control">
        <a className="button is-info">
          Search
        </a>
      </div>
    </div>     
    )
  }
}

class Search extends React.Component {
  render() {
    return(
      <div>
        <p>Search by Name:</p>
        <SrcByName />
        <p>Select Location:</p>
        <Select options={place} placeholder="Place" isSearchable multi />
        <p>Select Subject:</p>
        <Select options={subject} placeholder="Subject" isSearchable />
      </div>
    )
  }
}

export const Home = () => {
  return (
  <div>
    <div><SimpleSlider /></div>
    <div><Search /></div>
  </div>
  );
};
