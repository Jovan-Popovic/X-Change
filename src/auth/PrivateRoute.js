import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "./AuthService";

export const PrivateRoute = (props) => {
  let Component = props.component;
  let isAuthenticated = auth.getAuthStatus();
  return (
    <Route
      render={(props) => {
        return isAuthenticated ? <Component /> : <Redirect to="/" />;
      }}
    />
  );
};

//This component need to be changed, because login form won't be route anymore, and that means that redirect componenl will lead user to 404 page
