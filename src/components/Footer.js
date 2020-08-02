import React from "react";
import { Link } from "react-router-dom";

export const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column is-4 has-text-centered is-hidden-tablet">
            <Link className="title is-4" to={window.location}>
              X-Change
            </Link>
          </div>
          <div className="column is-4">
            <div className="level">
              <Link className="level-item" to="/">
                Home
              </Link>
              {props.isAuth ? (
                <Link className="level-item" to="/dashboard">
                  Dashboard
                </Link>
              ) : (
                <Link className="level-item" to="/" onClick={props.openLogin}>
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="column is-4 has-text-centered is-hidden-mobile">
            <Link className="title is-4" to={window.location}>
              X-Change
            </Link>
          </div>
          <div className="column is-4 has-text-right">
            <div className="level">
              {props.isAuth ? (
                <Link className="level-item" to="/chat">
                  Chat
                </Link>
              ) : (
                <Link className="level-item" to="/" onClick={props.openLogin}>
                  Chat
                </Link>
              )}
              {props.isAuth ? (
                <Link
                  className="level-item"
                  to={`/users/${localStorage.getItem("username")}`}
                >
                  {localStorage.getItem("username")}
                </Link>
              ) : (
                <Link className="level-item" to="/" onClick={props.openLogin}>
                  Guest
                </Link>
              )}
            </div>
          </div>
        </div>
        <p className="subtitle has-text-centered is-6">
          © 2020 X-Change. All right reserved.
        </p>
      </div>
    </footer>
  );
};
