/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { auth } from "../../auth/AuthService";
import { xChange } from "../../api/apiCalls";

export const SignUp = (props) => {
  //Function for handling form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = JSON.stringify({ ...props.data });
    const upfile = props.upfile;
    const userImage = new FormData();
    userImage.append("upfile", upfile, upfile.name);
    xChange
      .post("/register", userData)
      .then((res) => {
        console.log(res);
        auth.login(res.data.token, res.data["Created user"].username);
        return xChange.post("/uploadImage/user", userImage);
      })
      .then((res) => {
        console.log(res);
        props.showNotification(
          `You are now registered, Welcome ${localStorage.getItem("username")}`,
          "is-success"
        );
        props.toggleActiveStatus();
        props.toggleAuthStatus(true);
        props.history.push(`/users/${localStorage.getItem("username")}`);
      })
      .catch((error) => {
        console.error(error);
        props.showNotification("Whoops, something went wrong", "is-danger");
      });
  };

  return (
    <form id="signUp" onSubmit={handleSubmit}>
      <div className={`modal ${props.active ? "is-active" : ""}`}>
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
                    value={props.data.firstName}
                    onChange={props.handleInfo}
                    placeholder="Enter your First Name"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    name="lastName"
                    className="input"
                    type="text"
                    value={props.data.lastName}
                    onChange={props.handleInfo}
                    placeholder="Enter your First Name"
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
                    value={props.data.email}
                    placeholder="Enter your email adress"
                    onChange={props.handleInfo}
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
                    value={props.data.username}
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
                    value={props.data.password}
                    onChange={props.handleInfo}
                    minLength={8}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                  <input
                    className="input"
                    name="phoneNumber"
                    value={props.data.phoneNumber}
                    onChange={props.handleInfo}
                    type="tel"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Profile Picture</label>
                <div className="control">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="upfile"
                      accept="image/*"
                      onChange={props.handleFile}
                      required
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload" />
                      </span>
                      <span className="file-label">Choose an image</span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="label">Location</label>
                <div className="control">
                  <div className="select">
                    <select name="location" onChange={props.handleInfo}>
                      <option value="podgorica">Podgorica</option>
                      <option value="cetinje">Cetinje</option>
                      <option value="danilovgrad">Danilovgrad</option>
                      <option value="niksic">Niksic</option>
                      <option value="zabljak">Zabljak</option>
                      <option value="bar">Bar</option>
                      <option value="tivat">Tivat</option>
                      <option value="kotor">Kotor</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Biography (Optional)</label>
                <div className="control">
                  <textarea
                    name="bio"
                    className="textarea"
                    placeholder="Tell us something about yourself"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" />I agree to the terms and conditions
                  </label>
                </div>
              </div>
              {/* <div className="field">
                <div className="control">
                  <input
                    id="male"
                    className="is-checkradio"
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked
                  />
                  <label className="radio" htmlFor="male">
                    Male
                  </label>
                  <input
                    id="female"
                    className="is-checkradio"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  <label className="radio" htmlFor="female">
                    Female
                  </label>
                </div>
              </div> */}
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
