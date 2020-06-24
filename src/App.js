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
import SignUp from "./components/forms/SignUp";
import { Footer } from "./components/Footer";
import "bulma/css/bulma.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: auth.getAuthStatus(),
      navbarActive: false,
      signUpActive: false,
      logInActive: false,
    };
  }
  //Later inside a state place values for modals and navbar toggler,for easier work with login form
  checkLogin = () => {
    setTimeout(
      () => (this.state.isAuth ? "" : this.setState({ logInActive: true })),
      10000
    );
  };
  toggleAuthStatus = (status) => {
    if (!status) auth.logout();
    this.setState({ isAuth: status });
  };

  toggleActiveStatus = (value, status) => {
    this.setState({ [value]: !status });
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
                navActive={this.state.navbarActive}
                signUpActive={this.state.signUpActive}
                logInActive={this.state.logInActive}
                toggStatus={(value, status) =>
                  this.toggleActiveStatus(value, status)
                }
              />
            )}
          />
          {this.state.signUpActive ? (
            <SignUp
              signUpActive={this.state.signUpActive}
              toggStatus={() =>
                this.toggleActiveStatus("signUpActive", this.state.signUpActive)
              }
            />
          ) : (
            ""
          )}
          {this.state.logInActive ? (
            <Login
              auth={this.state.isAuth}
              toggleAuthStatus={this.toggleAuthStatus}
              logInActive={this.state.logInActive}
              toggStatus={() =>
                this.toggleActiveStatus("logInActive", this.state.logInActive)
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
