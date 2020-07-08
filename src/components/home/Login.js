import React from "react";
import { auth } from "../../auth/AuthService";
import { xChange } from "../../api/apiCalls";

export const Login = (props) => {
  //Function for handling form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = JSON.stringify({ ...props.data });
    xChange
      .post("/login", userData)
      .then((res) => {
        const responseData = res.data;
        auth.login(responseData.token, props.data.username);
        props.showNotification(
          `You are logged in, Welcome ${localStorage.getItem("username")}`,
          "is-success"
        );
        props.toggleActiveStatus();
        props.toggleAuthStatus(true);
        props.history.push(`/users/${localStorage.getItem("username")}`);
      })
      .catch((error) => {
        console.log(error);
        props.showNotification("Whoops, something went wrong", "is-danger");
      });
  };

  return (
    <form id="logIn" onSubmit={handleSubmit}>
      <div className={`modal ${props.active ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={props.toggleActiveStatus}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Login to your profile</p>
            <button
              type="button"
              onClick={props.toggleActiveStatus}
              className="delete"
            ></button>
          </header>
          <section className="modal-card-body">
            <label className="label">Username</label>
            <div className="control">
              <input
                name="username"
                className="input"
                type="text"
                value={props.data.username}
                placeholder="Enter your username"
                onChange={props.handleInfo}
                required
              />
            </div>
            <label className="label">Pasword</label>
            <div className="control">
              <input
                name="password"
                className="input"
                type="password"
                value={props.data.password}
                placeholder="Enter your password"
                onChange={props.handleInfo}
                required
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="control">
              <button type="submit" className="button is-primary">
                <i className="fas fa-user-circle" />
                &nbsp; Log In
              </button>
              <button
                type="button"
                className="button is-danger"
                onClick={props.toggleActiveStatus}
              >
                <i className="fas fa-times" />
                &nbsp; Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
    </form>
  );
};
