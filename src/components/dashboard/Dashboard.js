import React from "react";
import { Buy } from "./Buy";
import { Sell } from "./Sell";
import { xChange } from "../../api/apiCalls";

export const Dashboard = (props) => {
  /* React.useEffect(() => {
    xChange("/stats").then((res) => console.log(res));
  }, []); */
  
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

  const removeTransaction = (stateUpdate, stateArray = [], id) =>
    stateUpdate([
      ...stateArray.filter((transaction) => transaction._id !== id),
    ]);

  return (
    <div>
      <h1 className="title has-text-centered mb-5">
        Welcome to your Dashboard, {localStorage.getItem("username")}
      </h1>
      <Buy
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
        removeTransaction={removeTransaction}
        showNotification={props.showNotification}
      />
      <Sell
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
        removeTransaction={removeTransaction}
        showNotification={props.showNotification}
      />
    </div>
  );
};
