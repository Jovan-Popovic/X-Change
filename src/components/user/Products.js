/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";

export const Products = (props) => {
  const [products] = React.useState([...props.products]);
  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        All Products from this user
      </h2>
      <div className="box columns is-multiline is-centered mb-5">
        {products[0] ? (
          products.map((product) => (
            <div key={product._id} className="card column is-3 mx-5 my-5">
              <div className="card-image">
                <figure className="image is-1by1">
                  <img src={product.imageUrl} alt="" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  {/* <div className="media-left">
                    <figure className="image">
                      <img
                        src={product.profilePictureUrl}
                        className="is-circle"
                        alt=""
                      />
                    </figure>
                  </div> */}
                </div>
                <div className="content">
                  <p className="title is-4">{product.name}</p>
                <p>Description: {product.description}</p>
                  <p>
                    Created At: <Moment date={product.createdAt} format="LLLL" />
                  </p>
                  <Link
                    className="button is-primary"
                    to={`/products/${product._id}`}
                  >
                    <i className="fas fa-store-alt" /> &nbsp; Check store
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="modal-card-body has-text-centered">
            <p>
              You didn't purchased any product. To find product go to home page
              and find what you want
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
