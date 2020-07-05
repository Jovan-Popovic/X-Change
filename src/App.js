import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Chat } from "./components/chat/Chat";
import { Profile } from "./components/profile/Profile";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Product } from "./components/home/Product";
import { Navbar } from "./components/Navbar";
import { auth } from "./auth/AuthService";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Notification } from "./components/Notification";
import { Footer } from "./components/Footer";
import "bulma/css/bulma.css";

const App = () => {
  const [isAuth, updateAuth] = useState(auth.getAuthStatus());
  const [active, updateActive] = useState({
    navbar: false,
    signUp: false,
    logIn: false,
    addProduct: false,
    updateProfile: false,
    deleteProfile: false,
  });
  const [notification, updateNotification] = useState({
    value: "",
    status: "is-primary",
  });

  const toggleAuthStatus = (status) => {
    if (!status) auth.logout();
    updateAuth(status);
  };

  const toggleActiveStatus = (value, status) =>
    updateActive({ ...active, [value]: !status });

  const showNotification = (value, status) =>
    updateNotification({
      value,
      status,
    });

  return (
    <div className="container">
      {notification.value ? (
        <Notification
          value={notification.value}
          status={notification.status}
          showNotification={() =>
            showNotification(false, "Closed notification")
          }
        />
      ) : (
        ""
      )}
      <BrowserRouter>
        <Route
          path="*"
          render={(props) => (
            <Navbar
              {...props}
              isAuth={isAuth}
              navActive={active.navbar}
              signUpActive={active.signUp}
              logInActive={active.logIn}
              showNotification={showNotification}
              toggleAuthStatus={toggleAuthStatus}
              toggleActiveStatus={toggleActiveStatus}
            />
          )}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                isAuth={isAuth}
                active={active}
                notification={notification}
                showNotification={showNotification}
                toggleAuthStatus={toggleAuthStatus}
                toggleActiveStatus={toggleActiveStatus}
              />
            )}
          />
          <PrivateRoute
            path="/product/:id"
            component={Product}
            showNotification={showNotification}
          />
          <PrivateRoute
            path="/profile"
            component={Profile}
            active={active}
            showNotification={showNotification}
            toggleActiveStatus={toggleActiveStatus}
            toggleAuthStatus={toggleAuthStatus}
          />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            showNotification={showNotification}
          />
          <Route
            path="*"
            render={(props) => (
              <React.Fragment>
                <Redirect to="/404" />
                <NotFound {...props} />
              </React.Fragment>
            )}
          ></Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
