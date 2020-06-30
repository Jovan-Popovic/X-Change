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
import Login from "./components/forms/Login";
import { SignUp } from "./components/forms/SignUp";
import { Notification } from "./components/Notification";
import { AddProduct } from "./components/forms/AddProduct";
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
        addProduct: false,
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
      addProduct: {
        name: "",
        description: "",
        upfile: null,
        price: 3,
        condition: "",
        age: 0,
        category: "",
        quantity: 1,
      },
      notification: {
        value: "Starter notification",
        status: "is-primary",
      },
    };
  }

  //Open modal login form in first 10 sec if user isn't logged in
  /* checkLogin = () => {
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
  }; */

  updateFile = (event) => {
    const upfile = event.target.files[0];
    this.setState({
      ...this.state,
      addProduct: { ...this.state.addProduct, upfile },
    });
    console.log(this.state.addProduct.upfile);
  };

  //Update state of forms
  handleInfo = (event) => {
    let form = event.target.closest(["#signUp", "#logIn", "#addProduct"]).id;
    let userInfo = event.target.name;
    let value = event.target.value;
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
          {this.state.activeStatus.signUp ? (
            <SignUp
              signUpActive={this.state.activeStatus.signUp}
              signUpData={this.state.signUp}
              notification={this.state.notification.signUp}
              showNotification={this.showNotification}
              handleInfo={this.handleInfo}
              toggleActiveStatus={() =>
                this.toggleActiveStatus(
                  "activeStatus",
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
              showNotification={this.showNotification}
              toggleActiveStatus={() =>
                this.toggleActiveStatus(
                  "activeStatus",
                  "logIn",
                  this.state.activeStatus.logIn
                )
              }
            />
          ) : (
            ""
          )}
          {this.state.activeStatus.addProduct ? (
            <AddProduct
              addProductActive={this.state.activeStatus.addProduct}
              updateFile={this.updateFile}
              handleInfo={this.handleInfo}
              addProductData={this.state.addProduct}
              toggleActiveStatus={() =>
                this.toggleActiveStatus(
                  "activeStatus",
                  "addProduct",
                  this.state.activeStatus.addProduct
                )
              }
            />
          ) : (
            ""
          )}
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
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/chat" component={Chat} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute
              path="/profile"
              addProduct={this.state.addProduct}
              toggleActiveStatus={() =>
                this.toggleActiveStatus(
                  "activeStatus",
                  "addProduct",
                  this.state.activeStatus.addProduct
                )
              }
              component={Profile}
            />
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
