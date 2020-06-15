import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { Chat } from "./components/Chat";
import { Contact } from "./components/Contact";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { auth } from "./auth/AuthService";
import { PrivateRoute } from "./auth/PrivateRoute";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
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
  toggleAuthStatus = (status) => {
    if (!status) auth.logout();
    this.setState({ isAuth: status });
  };

  toggleActiveStatus = (value, status) => {
    this.setState({ [value]: !status });
  };

  render() {
    return (
      <div className="App">
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
          <SignUp
            signUpActive={this.state.signUpActive}
            toggStatus={() =>
              this.toggleActiveStatus("signUpActive", this.state.signUpActive)
            }
          />
          <Login
            auth={this.state.isAuth}
            toggleAuthStatus={this.toggleAuthStatus}
            logInActive={this.state.logInActive}
            toggStatus={() =>
              this.toggleActiveStatus("logInActive", this.state.logInActive)
            }
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <PrivateRoute path="/chat" component={Chat} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="*">
              <Redirect to="/404" />
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
