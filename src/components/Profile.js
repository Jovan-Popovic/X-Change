import React from "react";
import profile from "../img/profile.png";
import QuickView from "./QuickView"

export class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="overflow">
        <div className="columns is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
          <div className="column is-one-third" id="picture">
            <figure className="image is-1by1">
              <img src={profile} className="is-rounded" alt="" />
            </figure>
          </div>
          <div className="column">
            <strong className="is-size-3-mobile is-size-2-tablet is-size-1-desktop">
              Username
            </strong>
            <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
              First Name, Last Name
            </p>
            <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
              <i className="far fa-envelope"></i>
              Email
            </p>
            <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
              <i className="far fa-star"></i>
              Profile Rate
            </p>
          </div>
          <div className="column is-1">
            <button>
              <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
                <i className="fas fa-cog"></i>
              </p>
            </button>
          </div>
        </div>
        <div className="box has-text-centered">
          <button className="none-btn">
            <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
              <i className="fas fa-plus"></i>
            </p>
          </button>
        </div>
      </div>
    );
  }
}
