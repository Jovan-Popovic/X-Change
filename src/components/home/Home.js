import React from "react";
import { Carousel } from "./Carousel";
import { Filters } from "./Filters";
import { Products } from "./Products";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="overflow">
        <div className="columns">
          <Filters />
          <Carousel />
        </div>
        <Products />
      </div>
    );
  }
}
