import React from "react";
import profile from "../img/profile.png";
import settings from "../img/settings.png";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div id="quickviewDefault" className="quickview">
          <header className="quickview-header">
            <p className="title">Quickview title</p>
            <span className="delete" data-dismiss="quickview"></span>
          </header>

          <div className="quickview-body">
            <div className="quickview-block">
              ...
            </div>
          </div>
          <footer className="quickview-footer">

          </footer>
        </div>
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
              Email
            </p>
          </div>
          <div className="column is-1">
            <button data-show="quickview" data-target="quickviewDefault">
              <img src={settings} style={{width:"55px"}} alt="" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
