import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Chat } from "./components/chat/Chat";
import { Profile } from "./components/Profile";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./components/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import { auth } from "./auth/AuthService";
import { PrivateRoute } from "./auth/PrivateRoute";
import Login from "./components/forms/Login";
import { SignUp } from "./components/forms/SignUp";
import { Footer } from "./components/Footer";
import "bulma/css/bulma.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: auth.getAuthStatus(),
      activeStatus: {
        navbar: false,
        signUp: false,
        logIn: false,
        product: false,
      },
      signUp: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      },
      logIn: {
        username: "",
        password: "",
      },
    };
  }

  //Open modal login form in first 10 sec if user isn't logged in
  checkLogin = () => {
    setTimeout(
      () =>
        this.state.isAuth
          ? ""
          : this.setState({
              ...this.state,
              activeStatus: { ...this.state.activeStatus, logIn: true },
            }),
      10000
    );
  };

  //Update state of forms
  handleInfo = (event) => {
    let form = event.target.closest(["#signUp","#logIn"]).id;
    let userInfo = event.target.name;
    let value = event.target.value;
    this.setState({ [userInfo]: value });
    this.setState({
      ...this.state,
      [form]: { ...this.state[form], [userInfo]: value },
    });
  };

  //Toggle authenticated status
  toggleAuthStatus = (status) => {
    if (!status) auth.logout();
    this.setState({ isAuth: status });
  };

  //Toggle bulma's is-active class
  toggleActiveStatus = (value, status) => {
    let activeStatus = { ...this.state.activeStatus };
    activeStatus[value] = !status;
    this.setState({ activeStatus });
  };

  render() {
    return (
      <div className="container" onLoad={this.checkLogin}>
        <BrowserRouter>
          <Route
            path="*"
            render={() => (
              <Navbar
                auth={this.state.isAuth}
                toggleAuthStatus={this.toggleAuthStatus}
                username={this.state.logIn.username}
                navActive={this.state.activeStatus.navbar}
                signUpActive={this.state.activeStatus.signUp}
                logInActive={this.state.activeStatus.logIn}
                toggStatus={(value, status) =>
                  this.toggleActiveStatus(value, status)
                }
              />
            )}
          />
          {this.state.activeStatus.signUp ? (
            <SignUp
              signUpActive={this.state.activeStatus.signUp}
              signUpData={this.state.signUp}
              handleInfo={this.handleInfo}
              toggStatus={() =>
                this.toggleActiveStatus(
                  "signUp",
                  this.state.activeStatus.signUp
                )
              }
            />
          ) : (
            ""
          )}
          {this.state.activeStatus.logIn ? (
            <Login
              auth={this.state.isAuth}
              toggleAuthStatus={this.toggleAuthStatus}
              logInActive={this.state.activeStatus.logIn}
              logInData={this.state.logIn}
              handleInfo={this.handleInfo}
              toggStatus={() =>
                this.toggleActiveStatus("logIn", this.state.activeStatus.logIn)
              }
            />
          ) : (
            ""
          )}
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/chat" component={Chat} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="*">
              <Redirect to="/404" />
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
