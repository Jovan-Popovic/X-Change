import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../auth/AuthService";
import { books } from "../../api/apiCalls";

const Login = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = JSON.stringify(props.logInData);
    books
      .post("/login", userData)
      .then((res) => res.data)
      .then((data) => {
        auth.login(data.token, props.logInData.username);
        props.toggleAuthStatus(true);
        props.showNotification(data.Message)
        props.toggleActiveStatus();
      }).catch((error=>{
        console.log(error);
        props.showNotification("Mrs")
      }))
  };

  return (
    <form id="logIn" onSubmit={handleSubmit}>
      <div className={`modal ${props.logInActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={props.toggleActiveStatus}></div>
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

export default withRouter(Login);
