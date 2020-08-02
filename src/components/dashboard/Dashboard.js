import React, { useState } from "react";
import { Tabs } from "./Tabs";
import { Buy } from "./Buy";
import { Sell } from "./Sell";
import { Users } from "./Users";
import { Products } from "./Products";
import { xChange } from "../../api/apiCalls";

export const Dashboard = (props) => {
  const [active, setActive] = useState({
    buy: true,
    sell: false,
    users: false,
    products: false,
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [render, setRender] = useState(false);
  const getStats = () => {
    if (localStorage.getItem("admin"))
      xChange("/stats").then((res) => {
        console.log(res.data);
        setUsers(res.data.Users);
        setProducts(res.data.Products);
      });
  };

  React.useEffect(() => {
    setTimeout(getStats, 1500);
  }, [render]);

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

  const reRender = () => setRender(!render);

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
      {active.users ? (
        <Users
          users={users}
          showNotification={props.showNotification}
          reRender={reRender}
        />
      ) : (
        ""
      )}
      {active.products ? (
        <Products products={products} reRender={reRender} />
      ) : (
        ""
      )}
    </div>
  );
};
