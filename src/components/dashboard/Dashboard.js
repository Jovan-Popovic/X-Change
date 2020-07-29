import React, { useState } from "react";
import { Tabs } from "./Tabs";
import { Buy } from "./Buy";
import { Sell } from "./Sell";
import { Users } from "./Users";
import { Products } from "./Products";
import { xChange } from "../../api/apiCalls";

export const Dashboard = (props) => {
  const [active, setActive] = useState({
    users: false,
    products: false,
    buy: true,
    sell: false,
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    if (localStorage.getItem("admin"))
      xChange("/stats").then((res) => {
        console.log(res.data);
        setUsers(res.data.Users);
        setProducts(res.data.Products);
      });
  }, []);

  const activeTab = (activeTab) =>
    setActive({
      users: false,
      products: false,
      buy: false,
      sell: false,
      [activeTab]: true,
    });

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
      <Tabs active={active} activeTab={activeTab} />
      {active.buy ? (
        <Buy
          acceptRequest={acceptRequest}
          rejectRequest={rejectRequest}
          removeTransaction={removeTransaction}
          showNotification={props.showNotification}
        />
      ) : (
        ""
      )}
      {active.sell ? (
        <Sell
          acceptRequest={acceptRequest}
          rejectRequest={rejectRequest}
          removeTransaction={removeTransaction}
          showNotification={props.showNotification}
        />
      ) : (
        ""
      )}
      {active.users ? <Users users={users} /> : ""}
      {active.products ? <Products products={products} /> : ""}
    </div>
  );
};
