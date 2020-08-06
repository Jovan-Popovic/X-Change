import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../auth/AuthService";

export const Navbar = (props) => {
  const [name, setName] = React.useState("");

  const getProducts = () => {
    sessionStorage.setItem("name", name);
    sessionStorage.getItem("name")
      ? props.history.push("/search")
      : props.showNotification(
          "You have to enter something in input to search for products",
          "is-primary"
        );
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src={require("../img/navbar-logo.png")}
            className="logo"
            alt=""
          />
        </Link>
        <Link
          onClick={() => props.toggleActiveStatus("navbar", props.navActive)}
          to={window.location}
          role="button"
          className={`navbar-burger burger ${
            props.navActive ? "is-active" : ""
          }`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </Link>
      </div>
      <div
        id="navbar"
        className={`navbar-menu ${props.navActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <NavLink className="navbar-item" exact to="/">
            <i className="fas fa-home" />
            &nbsp; Home
          </NavLink>
          {props.isAuth ? (
            <React.Fragment>
              <NavLink className="navbar-item" to="/dashboard">
                <i className="fas fa-chart-line" />
                &nbsp; Dashboard
              </NavLink>
              <NavLink className="navbar-item" to="/chat">
                <i className="fas fa-comments" />
                &nbsp; Chat
              </NavLink>{" "}
              <NavLink
                className="navbar-item"
                to={`/users/${localStorage.getItem("username")}`}
              >
                <i className="fas fa-user-alt" />
                &nbsp; {localStorage.getItem("username")}
              </NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="navbar-item" to="/" onClick={props.openLogin}>
                <i className="fas fa-chart-line" />
                &nbsp; Dashboard
              </Link>
              <Link className="navbar-item" to="/" onClick={props.openLogin}>
                <i className="fas fa-comments" />
                &nbsp; Chat
              </Link>
              <Link className="navbar-item" to="/" onClick={props.openLogin}>
                <i className="fas fa-user-alt" />
                &nbsp; Guest
              </Link>
            </React.Fragment>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter" || event.keyCode === 13)
                    getProducts();
                }}
                placeholder="Search product"
              />
            </div>
            <div className="control">
              <button className="button is-primary" onClick={getProducts}>
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              {props.isAuth ? (
                <button
                  className="button is-light"
                  onClick={() => {
                    auth.logout();
                    props.toggleAuthStatus(false);
                    props.showNotification(
                      "You are logged out, see you soon :)",
                      "is-light"
                    );
                  }}
                >
                  <i className="fas fa-sign-out-alt" />
                  &nbsp; Log Out
                </button>
              ) : (
                <React.Fragment>
                  <Link
                    to="/"
                    className="button is-info"
                    onClick={() => {
                      props.history.push("/");
                      props.toggleActiveStatus("signUp", props.signUpActive);
                    }}
                  >
                    <i className="fas fa-sign-in-alt" />
                    &nbsp; Sign Up
                  </Link>
                  <Link
                    to="/"
                    className="button is-light"
                    onClick={() => {
                      props.history.push("/");
                      props.openLogin();
                    }}
                  >
                    <i className="fas fa-user-circle" />
                    &nbsp; Log In
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
