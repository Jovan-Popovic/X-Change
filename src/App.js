import React, {useState} from "react";
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
  });
  const [notification, updateNotification] = useState({
    value: "Starter notification",
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
              toggleAuthStatus={toggleAuthStatus}
              toggleActiveStatus={toggleActiveStatus}
            />
          )}
        />
        {notification.value ? (
          <Notification
            value={notification.value}
            status={notification.status}
            showNotification={() =>
              showNotification("value", notification.value)
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
                active={active}
                notification={notification}
                toggleAuthStatus={toggleAuthStatus}
                showNotification={showNotification}
                toggleActiveStatus={toggleActiveStatus}
              />
            )}
          />
          <PrivateRoute path="/product/:id" component={Product} />
          <PrivateRoute
            path="/profile"
            component={Profile}
            active={active}
            toggleActiveStatus={toggleActiveStatus}
          />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
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
