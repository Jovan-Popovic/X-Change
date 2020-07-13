/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { Carousel } from "./Carousel";
import { LastProducts } from "./LastProducts";

export const Home = (props) => {
  const [data, updateData] = useState({
    signUp: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      location: "podgorica",
      phoneNumber: 0,
    },
    logIn: {
      username: "",
      password: "",
    },
    upfile: null,
  });

  React.useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleInfo = (event) => {
    const form = event.target.closest(["#signUp", "#logIn"]).id;
    const key = event.target.name;
    const value = event.target.value;
    updateData({ ...data, [form]: { ...data[form], [key]: value } });
  };

  const handleFile = (event) => {
    const upfile = event.target.files[0];
    updateData({ ...data, upfile });
  };

  return (
    <div>
      {props.active.signUp ? (
        <SignUp
          active={props.active.signUp}
          data={data.signUp}
          history={props.history}
          upfile={data.upfile}
          showNotification={props.showNotification}
          handleInfo={handleInfo}
          handleFile={handleFile}
          toggleAuthStatus={props.toggleAuthStatus}
          toggleActiveStatus={() =>
            props.toggleActiveStatus("signUp", props.active.signUp)
          }
        />
      ) : (
        ""
      )}
      {props.active.logIn ? (
        <Login
          active={props.active.logIn}
          data={data.logIn}
          history={props.history}
          showNotification={props.showNotification}
          handleInfo={handleInfo}
          toggleAuthStatus={props.toggleAuthStatus}
          toggleActiveStatus={() =>
            props.toggleActiveStatus("logIn", props.active.logIn)
          }
        />
      ) : (
        ""
      )}
      <Carousel />
      <LastProducts
        isAuth={props.isAuth}
        toggleActiveStatus={() =>
          props.toggleActiveStatus("logIn", props.active.logIn)
        }
      />
    </div>
  );
};
