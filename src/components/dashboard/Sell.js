/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Sell = (props) => {
  const [sell, getSell] = React.useState([]);

  React.useEffect(() => {
    xChange("/transactions")
      .then((res) => {
        getSell(res.data.sell);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const removeTransaction = (id) =>
    getSell([
      ...sell.map((transaction) =>
        transaction._id === id
          ? { ...transaction, sellerConsent: true }
          : { ...transaction }
      ),
    ]);

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        Check who wants to purchase your products
      </h2>
      <div className="box columns is-multiline is-centered mb-5">
        {sell.length ? (
          sell.map((product) =>
            product.sellerConsent ? (
              ""
            ) : (
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
                      <p className="subtitle is-6">
                        <Link to={`users/${product.buyer.username}`}>
                          @{product.buyer.username}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="content">
                    <p>
                      User @{product.buyer.username} wants to buy your{" "}
                      {product.productId.name}. Please press Accept button to
                      confirm transaction.
                    </p>
                    <p className="is-capitalized">
                      Location: {product.buyer.location || "Location unknown"}
                    </p>
                    <p>Phone Number: {product.buyer.phoneNumber}</p>
                    <p>
                      Request sent:{" "}
                      <Moment date={product.createdAt} format="LLLL" />
                    </p>
                    <button
                      className="button is-success"
                      onClick={() => {
                        props.acceptRequest(product._id);
                        removeTransaction(product._id);
                        props.showNotification(
                          `You've accepted purchase of user ${product.buyer.username}`,
                          "is-success"
                        );
                      }}
                    >
                      <i className="fas fa-check-circle" />
                      &nbsp; Accept
                    </button>
                    <button
                      className="button is-danger ml-3"
                      onClick={() => {
                        props.rejectRequest(product._id);
                        removeTransaction(product._id);
                        props.showNotification(
                          `You've rejected purchase of user ${product.buyer.username}`,
                          "is-danger"
                        );
                      }}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="modal-card-body has-text-centered">
            <p>
              Nobody bought any of your products, be patient, customers will
              come by time.
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
