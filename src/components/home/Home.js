import React from "react";
import { SignUp } from "../forms/SignUp";
import { Login } from "../forms/Login";
import { Carousel } from "./Carousel";
import { Filters } from "./Filters";
import { LastProducts } from "./LastProducts";

export const Home = (props) => {
  return (
    <div>
      {props.activeStatus.signUp ? (
        <SignUp
          active={props.activeStatus.signUp}
          data={props.signUp}
          notification={props.notification}
          showNotification={props.showNotification}
          handleInfo={props.handleInfo}
          updateFile={props.updateFile}
          toggleAuthStatus={props.toggleAuthStatus}
          toggleActiveStatus={() =>
            props.toggleActiveStatus(
              "activeStatus",
              "signUp",
              props.activeStatus.signUp
            )
          }
        />
      ) : (
        ""
      )}
      {props.activeStatus.logIn ? (
        <Login
          active={props.activeStatus.logIn}
          data={props.logIn}
          notification={props.notification}
          showNotification={props.showNotification}
          handleInfo={props.handleInfo}
          toggleAuthStatus={props.toggleAuthStatus}
          toggleActiveStatus={() =>
            props.toggleActiveStatus(
              "activeStatus",
              "logIn",
              props.activeStatus.logIn
            )
          }
        />
      ) : (
        ""
      )}
      <div className="columns">
        <Filters />
        <Carousel />
      </div>
      <LastProducts />
    </div>
  );
};
