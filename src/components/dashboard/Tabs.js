/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export const Tabs = (props) => {
  const { active, activeTab } = props;

  return (
    <div className="tabs is-fullwidth">
      <ul>
        <li
          className={active.buy ? "is-active" : ""}
          onClick={() => activeTab("buy")}
        >
          <a>
            <i className="fas fa-shopping-cart" aria-hidden="true" />
            &nbsp;&nbsp;Buy
          </a>
        </li>
        <li
          className={active.sell ? "is-active" : ""}
          onClick={() => activeTab("sell")}
        >
          <a>
            <i className="fas fa-stamp" aria-hidden="true" />
            &nbsp;&nbsp;Sell
          </a>
        </li>
        {localStorage.getItem("admin") ? (
          <React.Fragment>
            <li
              className={active.users ? "is-active" : ""}
              onClick={() => activeTab("users")}
            >
              <a>
                <i className="fas fa-users" aria-hidden="true" />
                &nbsp;&nbsp;All Users
              </a>
            </li>
            <li
              className={active.products ? "is-active" : ""}
              onClick={() => activeTab("products")}
            >
              <a>
                <i className="fas fa-store-alt" aria-hidden="true" />
                &nbsp;&nbsp;All Products
              </a>
            </li>
          </React.Fragment>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};
