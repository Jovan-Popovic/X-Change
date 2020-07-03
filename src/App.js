import React from "react";
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
  const [app, updateAppState] = React.useState({
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
  });

  //Toggle authenticated status
  const toggleAuthStatus = (status) => {
    if (!status) auth.logout();
    updateAppState({ ...app, isAuth: status });
  };

  //Toggle bulma's is-active class
  const toggleActiveStatus = (stateObj, value, status) => {
    let stateObject = { ...app[stateObj] };
    stateObject[value] = !status;
    updateAppState({ ...app, [stateObj]: stateObject });
  };

  const showNotification = (value, status) => {
    updateAppState({
      ...app,
      notification: {
        value,
        status,
      },
    });
  };

  return (
    <div className="container">
      <BrowserRouter>
        <Route
          path="*"
          render={(props) => (
            <Navbar
              {...props}
              auth={app.isAuth}
              navActive={app.activeStatus.navbar}
              signUpActive={app.activeStatus.signUp}
              logInActive={app.activeStatus.logIn}
              toggleAuthStatus={toggleAuthStatus}
              toggleActiveStatus={toggleActiveStatus}
            />
          )}
        />
        {app.notification.value ? (
          <Notification
            value={app.notification.value}
            status={app.notification.status}
            toggleActiveStatus={() =>
              toggleActiveStatus(
                "notification",
                "value",
                app.notification.value
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
                activeStatus={app.activeStatus}
                notification={app.notification}
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
            active={app.activeStatus}
            toggleActiveStatus={toggleActiveStatus}
          />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route
            path="*"
            render={(props) => (
              <React.Fragment>
                <Redirect to="/404" />
                <NotFound {...props}/>
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
