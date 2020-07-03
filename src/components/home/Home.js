import React, { useState } from "react";
import { SignUp } from "../forms/SignUp";
import { Login } from "../forms/Login";
import { Carousel } from "./Carousel";
import { Filters } from "./Filters";
import { LastProducts } from "./LastProducts";

<<<<<<< HEAD
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="overflow">
        <div className="columns">
          <Filters />
          <Carousel />
        </div>
        <Products />
=======
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

  console.log(props)
  return (
    <div>
      {props.activeStatus.signUp ? (
        <SignUp
          active={props.activeStatus.signUp}
          data={data.signUp}
          upfile={data.upfile}
          showNotification={props.showNotification}
          handleInfo={handleInfo}
          handleFile={handleFile}
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
          data={data.logIn}
          showNotification={props.showNotification}
          handleInfo={handleInfo}
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
>>>>>>> master
      </div>
      <LastProducts />
    </div>
  );
};
