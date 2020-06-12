import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../auth/AuthService";

const Login = (props) => {
  function handleSubmit(event) {
    event.preventDefault();
    auth.login();
    props.toggleAuthStatus(true);
    props.history.push("/");
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label className="label">First Name</label>
        <div className="control">
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Enter your email adress"
          />
        </div>
        <button type="submit" className="button is-primary">
          Login
        </button>
      </form>
    </React.Fragment>
  );
};

export default withRouter(Login);
