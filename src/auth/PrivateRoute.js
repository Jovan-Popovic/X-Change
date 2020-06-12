import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "./AuthService";

export const PrivateRoute = (props) => {
  let Component = props.component;
  let isAuthenticated = auth.getAuthStatus();
  console.log(props);
  return (
    <Route
      render={(props) => {
        return isAuthenticated ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
};

/* return (
    <Route  render={(props) => {  return isAuthenticated ? (
          <Component></Component> ) :
 ( <Redirect to="/login"></Redirect> );
      }}></Route>
 */
