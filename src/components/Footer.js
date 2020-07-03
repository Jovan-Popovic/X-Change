import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
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
              <Link className="level-item" to="/dashboard">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="column is-4 has-text-centered is-hidden-mobile">
            <Link className="title is-4" to={window.location}>
              X-Change
            </Link>
          </div>
          <div className="column is-4 has-text-right">
            <div className="level">
              <Link className="level-item" to="/chat">
                Chat
              </Link>
              <Link className="level-item" to="/profile">
                Profile
              </Link>
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
