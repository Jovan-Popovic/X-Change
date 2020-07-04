import React from "react";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Sell = (props) => {
  const [sell, getSell] = React.useState([]);

  React.useEffect(() => {
    xChange("/transactions")
      .then((res) => {
        getSell(res.data.sell);
        console.log(res.data.sell[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const acceptRequest = (id) => {
    xChange(`transactions/${id}/accept`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered">
        Check who wants to purchase your products
      </h2>
      <div className="columns is-multiline is-centered">
        {sell.map((product) => (
          <div key={product._id} className="card column is-3 mx-5 my-5">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src={product.productId.imageUrl} alt="" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image">
                    <img
                      src={product.buyer.profilePictureUrl}
                      className="is-circle"
                      alt=""
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{product.productId.name}</p>
                  <p className="subtitle is-6">@{product.buyer.username}</p>
                </div>
              </div>
              <div className="content">
                <p>
                  User @{product.buyer.username} wants to buy your{" "}
                  {product.productId.name}. Please press Accept button to
                  confirm transaction.
                </p>
                <p>
                  Location:{" "}
                  {product.buyer.location !== ""
                    ? product.buyer.location[0].toUpperCase() +
                      product.buyer.location.slice(1)
                    : "Locatio unknown"}
                </p>
                <p>Phone Number: {product.buyer.phoneNumber}</p>
                <p>
                  Request sent:{" "}
                  <Moment date={product.createdAt} format="LLLL" />
                </p>
                <button
                  className="button is-success"
                  onClick={() => acceptRequest(product._id)}
                >
                  <i className="fas fa-check-circle" />
                  &nbsp; Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
