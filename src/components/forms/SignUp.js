import React from "react";
import { books } from "../../api/apiCalls";

export const SignUp = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = JSON.stringify(props.signUpData);
    books
      .post("/register", userData)
      .then((res) => {
        console.log(res.data.Message);
        props.showNotification(res.data.Message)
        props.toggleActiveStatus();
      })
      .catch((error) => {
        console.error(error);
        props.showNotification("SOAB")
      });
  };

  return (
    <form id="signUp" onSubmit={handleSubmit}>
      <div className={`modal ${props.signUpActive ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={props.toggleActiveStatus}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign Up and join us</p>
            <button
              type="button"
              onClick={props.toggleActiveStatus}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="column">
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    name="firstName"
                    className="input"
                    type="text"
                    value={props.firstName}
                    onChange={props.handleInfo}
                    placeholder="Enter your First Name"
                    required
                  />
                </div>
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    name="lastName"
                    className="input"
                    type="text"
                    value={props.lastName}
                    onChange={props.handleInfo}
                    placeholder="Enter your First Name"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    name="username"
                    className="input"
                    type="text"
                    placeholder="Text input"
                    onChange={props.handleInfo}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    name="password"
                    className="input"
                    type="password"
                    placeholder="Text input"
                    onChange={props.handleInfo}
                    minLength={8}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    name="email"
                    className="input"
                    type="email"
                    placeholder="Enter your email adress"
                    onChange={props.handleInfo}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Biography (Optional)</label>
                <div className="control">
                  <textarea
                    name="bio"
                    className="textarea"
                    placeholder="Tell us something about yourself"
                    value={props.bio}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" required />I agree to the terms and
                    conditions
                  </label>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      defaultChecked
                    />
                    Male
                  </label>
                  <label className="radio">
                    <input type="radio" name="gender" value="female" />
                    Female
                  </label>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="control">
              <button type="submit" className="button is-primary">
                <i className="fas fa-plus" />
                &nbsp; Create Account
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
