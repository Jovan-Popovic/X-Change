import React from "react";
import { Buy } from "./Buy";
import { Sell } from "./Sell";
import { xChange } from "../../api/apiCalls";
import { MyProducts } from "./MyProducts";

export const Dashboard = (props) => {
  const acceptRequest = (id) => {
    xChange(`transactions/${id}/accept`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  const rejectRequest = (id) => {
    xChange(`transactions/${id}/reject`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 className="title has-text-centered mb-5">
        Welcome to your Dashboard, {localStorage.getItem("username")}
      </h1>
      <MyProducts showNotification={props.showNotification} />
      <Buy
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
        showNotification={props.showNotification}
      />
      <Sell
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
        showNotification={props.showNotification}
      />
    </div>
  );
};
