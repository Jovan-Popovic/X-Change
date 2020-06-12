import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { auth } from "../auth/AuthService";

const Navbar = (props) => {
  const [isActive, setisActive] = React.useState(false);

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img alt="" src="https://bulma.io/images/bulma-logo.png" />
        </Link>
        <Link
          onClick={() => {
            setisActive(!isActive);
          }}
          to={window.location}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>
      {/*  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>  */}
      <div id="navbar" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
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
          <NavLink className="navbar-item" to="/dashboard">
            Dashboard
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {props.auth ? (
                <NavLink
                  to={window.location}
                  className="button is-light"
                  onClick={() => {
                    auth.logout();
                    props.toggleAuthStatus(false);
                  }}
                >
                  Log out
                </NavLink>
              ) : (
                <React.Fragment>
                  <NavLink to="/sign-up" className="button is-primary">
                    Sign up
                  </NavLink>
                  <NavLink to="/login" className="button is-light">
                    Log in
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
