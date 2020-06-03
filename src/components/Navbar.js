import React from "react";
import { NavLink } from "react-router-dom";
import "bulma/css/bulma.css";

const NavBar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" />
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="navbar-start">
          <NavLink className="navbar-item" exact to="/">
            <span className="fa fa-home"></span> &nbsp; Home
          </NavLink>
          <NavLink className="navbar-item" to="/chat">
            <span className="fa fa-comment"></span> &nbsp; Chat
          </NavLink>
          <NavLink className="navbar-item" to="/contact">
            <span className="fa fa-address-book"></span> &nbsp; Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
