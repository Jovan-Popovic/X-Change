import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../auth/AuthService";

const Login = (props) => {
  function handleSubmit(event) {
    event.preventDefault();
    auth.login();
    props.toggleAuthStatus(true);
    props.toggStatus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`modal ${props.logInActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={props.toggStatus}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign Up and join us today!</p>
            <button
              type="button"
              onClick={props.toggStatus}
              className="delete"
            ></button>
          </header>
          <section className="modal-card-body">
            <label className="label">Email Adress</label>
            <div className="control">
              <input
                name="email"
                className="input"
                type="text"
                placeholder="Enter your email adress"
              />
            </div>
            <label className="label">Pasword</label>
            <div className="control">
              <input
                name="password"
                className="input"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="control">
              <button type="submit" className="button is-primary">
                Login
              </button>
              <button
                type="button"
                className="button is-danger"
                onClick={props.toggStatus}
              >
                Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
    </form>
  );
};

export default withRouter(Login);
