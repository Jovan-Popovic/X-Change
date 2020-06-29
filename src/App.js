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
        price: 3,
        image: "",
        condition: "",
        age: 0,
        category: "",
        quantity: 1,
      },
      notification: {
        signUp:
          "Cupidatat eiusmod consectetur proident nulla excepteur. Elit incididunt cillum reprehenderit culpa laborum sunt. Nulla labore pariatur consequat dolor reprehenderit irure ut sunt.Id eu veniam deserunt nostrud dolor tempor minim eiusmod velit. Nisi id elit Lorem est occaecat est eu. Nostrud sint adipisicing adipisicing consequat adipisicing adipisicing velit pariatur. In esse amet nulla ullamco exercitation qui voluptate elit nisi velit sunt sit amet irure.Ex id amet do duis velit dolor ea. Anim ex quis sit id duis. Labore excepteur laboris cupidatat tempor. Nisi ut ad do enim elit nisi enim minim.Anim non reprehenderit sint eiusmod commodo dolore dolor. Magna deserunt aliquip duis do dolor nulla officia aute amet. Duis sint quis ex ipsum amet esse duis consectetur esse ad. Consectetur sint laboris culpa proident consequat aliquip officia commodo culpa consectetur.",
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

  showNotification = (value) =>
    this.setState({
      ...this.state,
      notification: { ...this.state.notification, signUp: value },
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
              handleInfo={this.handleInfo}
              addProductData={this.state.addProduct}
              toggleActiveStatus={() =>
                this.toggleActiveStatus(
                  "addProduct",
                  this.state.activeStatus.addProduct
                )
              }
            />
          ) : (
            ""
          )}
          {this.state.notification.signUp ? (
            <Notification
              value={this.state.notification.signUp}
              toggleActiveStatus={() =>
                this.toggleActiveStatus(
                  "notification",
                  "signUp",
                  this.state.notification.signUp
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
