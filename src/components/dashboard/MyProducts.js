/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import "moment-timezone";

export const MyProducts = (props) => {
  const products = React.useState();

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        Check all of your products
      </h2>
      <div className="box columns is-multiline is-centered mb-5">
        {products[0] ? (
          <div></div>
        ) : (
          <div className="modal-card-body has-text-centered">
            <p>
              You don't have any products on sale. To add products go to your
              profile page and post new product.
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
