import React from "react";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
      bio: "",
      gender: "male",
    };
  }

  handleInfo = (event) => {
    let userInfo = event.target.name;
    let value = event.target.value;
    this.setState({ [userInfo]: value });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert("You didn't actually signed up, to get access to private routes just press login button");
  };
  render() {
    return (
      <div className="all">
        <div className="column is-4">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  name="firstName"
                  className="input"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleInfo}
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
                  value={this.state.lastName}
                  onChange={this.handleInfo}
                  placeholder="Enter your First Name"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  name="userName"
                  className="input is-success"
                  type="text"
                  placeholder="Text input"
                  onChange={this.handleInfo}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-success">This username is available</p>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  name="password"
                  className="input is-warning"
                  type="password"
                  placeholder="Text input"
                  onChange={this.handleInfo}
                  minLength={8}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
                {/* <span className="icon is-small is-right">
                <i className="fas fa-check" />
              </span> */}
              </div>
              <p className="help is-warning">This password is too short</p>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  name="email"
                  className="input is-danger"
                  type="email"
                  placeholder="Enter your email adress"
                  onChange={this.handleInfo}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                {/* <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle" />
            </span> */}
              </div>
              <p className="help is-danger">This email is invalid</p>
            </div>
            <div className="field">
              <label className="label">Biography (Optional)</label>
              <div className="control">
                <textarea
                  name="bio"
                  className="textarea"
                  placeholder="Tell us something about yourself"
                  value={this.state.bio}
                  onChange={this.handleInfo}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="checkbox" required>
                  <input type="checkbox" />I agree to the terms and conditions
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    onChange={this.handleInfo}
                    value="male"
                    defaultChecked
                  />
                  Male
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="gender"
                    onChange={this.handleInfo}
                    value="female"
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
