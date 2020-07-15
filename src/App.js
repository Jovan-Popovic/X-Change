import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";
import { Notification } from "./components/Notification";
import { Home } from "./components/home/Home";
import { Search } from "./components/search/Search";
import { Product } from "./components/product/Product";
import { User } from "./components/user/User";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Chat } from "./components/chat/Chat";
import { PrivateRoute } from "./auth/PrivateRoute";
import { auth } from "./auth/AuthService";
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

  const openLogin = () => toggleActiveStatus("logIn", active.logInActive);
  /* 
  const handleFilters = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    value ? sessionStorage.setItem(key, value) : sessionStorage.removeItem(key);
  }; */

  return (
    <div className="container">
      <BrowserRouter>
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
        <Route
          path="*"
          render={(props) => (
            <Navbar
              {...props}
              isAuth={isAuth}
              navActive={active.navbar}
              signUpActive={active.signUp}
              logInActive={active.logIn}
              openLogin={openLogin}
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
          <Route
            path="/search"
            render={(props) => (
              <Search
                {...props}
                isAuth={isAuth}
                showNotification={showNotification}
                toggleActiveStatus={() =>
                  toggleActiveStatus("logIn", active.logIn)
                }
              />
            )}
          />
          <PrivateRoute
            path="/users/:username"
            component={User}
            active={active}
            showNotification={showNotification}
            toggleActiveStatus={toggleActiveStatus}
            toggleAuthStatus={toggleAuthStatus}
          />
          <PrivateRoute
            path="/products/:id"
            component={Product}
            showNotification={showNotification}
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
        <Route
          path="*"
          render={(props) => (
            <Footer {...props} isAuth={isAuth} openLogin={openLogin} />
          )}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
