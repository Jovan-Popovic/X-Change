import React from "react";
import { Buy } from "./Buy";
import { Sell } from "./Sell";

export const Dashboard = () => {
  return (
    <div>
      <h1 className="title has-text-centered">Welcome to your Dashboard, {localStorage.getItem("username")}</h1>
      <Buy />
      <Sell />
    </div>
  );
};
