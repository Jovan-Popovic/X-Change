import React from "react";
import { Buy } from "./Buy";
import { Sell } from "./Sell";
import { xChange } from "../../api/apiCalls";

export const Dashboard = () => {
  const acceptRequest = (id) => {
    xChange(`transactions/${id}/accept`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1 className="title has-text-centered">
        Welcome to your Dashboard, {localStorage.getItem("username")}
      </h1>
      <Buy acceptRequest={acceptRequest} />
      <Sell acceptRequest={acceptRequest} />
    </div>
  );
};
