import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Chat } from "./components/chat/Chat";
import { Profile } from "./components/profile/Profile";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./components/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import { auth } from "./auth/AuthService";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Notification } from "./components/Notification";
import { Footer } from "./components/Footer";
import { books } from "./api/apiCalls";
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
        addProduct: false,
        updateProfile: false,
      },
      notification: {
        value: "Starter notification",
        status: "is-primary",
      },
      signUp: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        upfile: null,
        location: "",
        phoneNumber: 0,
      },
      logIn: {
        username: "",
        password: "",
      },
      userInfo: {},
      addProduct: {
        name: "",
        description: "Random description",
        upfile: null,
        price: 3,
        condition: "",
        age: 0,
        category: "",
        quantity: 1,
      },
      updateProfile: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: 0,
        location: "",
      },
    };
  }

  //Update state of forms
  handleInfo = (event) => {
    let form = event.target.closest([
      "#signUp",
      "#logIn",
      "#addProduct",
      "#updateProfile",
    ]).id;
    let userInfo = event.target.name;
    let value = event.target.value;
    this.setState({
      ...this.state,
      [form]: { ...this.state[form], [userInfo]: value },
    });
  };

  updateFile = (event) => {
    let form = event.target.closest(["#signUp", "#addProduct"]).id;
    const upfile = event.target.files[0];
    this.setState({
      ...this.state,
      [form]: { ...this.state[form], upfile },
    });
    console.log(this.state[form].upfile);
  };

  //Toggle authenticated status
  toggleAuthStatus = (status) => {
    if (!status) auth.logout();
    this.setState({ isAuth: status });
  };

  //Toggle bulma's is-active class
  toggleActiveStatus = (stateObj, value, status) => {
    let stateObject = { ...this.state[stateObj] };
    stateObject[value] = !status;
    this.setState({ [stateObj]: stateObject });
  };

  showNotification = (value, status) =>
    this.setState({
      ...this.state,
      notification: {
        value,
        status,
      },
    });

  getUserInfo = () =>
    books(`/findUser/${localStorage.getItem("username")}`)
      .then((res) => {
        console.log(res);
        this.setState({ userInfo: res.data.user });
      })
      .then(() => console.log(this.state.userInfo))
      .catch((error) => console.log(error));

  render() {
    return (
      <div className="container">
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
                toggleActiveStatus={this.toggleActiveStatus}
              />
            )}
          />
          {this.state.notification.value ? (
            <Notification
              value={this.state.notification.value}
              status={this.state.notification.status}
              toggleActiveStatus={() =>
                this.toggleActiveStatus(
                  "notification",
                  "value",
                  this.state.notification.value
                )
              }
            />
          ) : (
            ""
          )}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  activeStatus={this.state.activeStatus}
                  toggleAuthStatus={this.toggleAuthStatus}
                  signUp={this.state.signUp}
                  logIn={this.state.logIn}
                  notification={this.state.notification}
                  showNotification={this.showNotification}
                  handleInfo={this.handleInfo}
                  updateFile={this.updateFile}
                  toggleActiveStatus={this.toggleActiveStatus}
                />
              )}
            />
            <PrivateRoute
              path="/profile"
              component={Profile}
              active={this.state.activeStatus}
              userInfo={this.state.userInfo}
              addProduct={this.state.addProduct}
              updateProfile={this.state.updateProfile}
              handleInfo={this.handleInfo}
              updateFile={this.updateFile}
              getUserInfo={this.getUserInfo}
              toggleActiveStatus={this.toggleActiveStatus}
            />
            <PrivateRoute path="/chat" component={Chat} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
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
