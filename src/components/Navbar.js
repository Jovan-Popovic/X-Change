import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { auth } from "../auth/AuthService";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* 
      navbarToggle: false,
      signUpToggle: false,
      logInToggle: false,
    */
    };
  }
  /* 
  toggleStatus = (value, status) => {
    this.setState({ [value]: !status });
  }; */

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img alt="" src="https://bulma.io/images/bulma-logo.png" />
          </Link>
          <Link
            onClick={() =>
              this.props.toggStatus("navbarActive", this.props.navActive)
            }
            to={window.location}
            role="button"
            className={`navbar-burger burger ${
              this.props.navActive ? "is-active" : ""
            }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>
        <div
          id="navbar"
          className={`navbar-menu ${this.props.navActive ? "is-active" : ""}`}
        >
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
                {this.props.auth ? (
                  <NavLink
                    to={window.location}
                    className="button is-light"
                    onClick={() => {
                      auth.logout();
                      this.props.toggleAuthStatus(false);
                    }}
                  >
                    Log out
                  </NavLink>
                ) : (
                  <React.Fragment>
                    <button
                      className="button is-primary"
                      onClick={() =>
                        this.props.toggStatus(
                          "signUpActive",
                          this.props.signUpActive
                        )
                      }
                    >
                      Sign up
                    </button>
                    <button
                      className="button is-light"
                      onClick={() =>
                        this.props.toggStatus(
                          "logInActive",
                          this.props.logInActive
                        )
                      }
                    >
                      Log in
                    </button>
                    {/* move bottom part of code to app component, for easier work with modal value*/}
                    {/*  <SignUp
                      modalToggle={this.state.signUpToggle}
                      changeModalStatus={() =>
                        this.toggleStatus(
                          "signUpToggle",
                          this.state.signUpToggle
                        )
                      }
                    /> */}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default withRouter(Navbar);
