/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Products = (props) => {
  const [products] = React.useState([...props.products]);

  const deleteProduct = (id) =>
    xChange(`/deleteProduct/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        {props.sameUsername
          ? "Check all your products"
          : `Check all products from ${props.username}`}
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
                    Created At:{" "}
                    <Moment date={product.createdAt} format="LLLL" />
                  </p>
                  <Link
                    className="button is-primary"
                    to={`/products/${product._id}`}
                  >
                    <i className="fas fa-store-alt" /> &nbsp; Check store
                  </Link>
                  {props.sameUsername ? (
                    <button
                      className="button is-danger"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <i className="fas fa-trash" />
                      &nbsp; Delete Product
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="modal-card-body has-text-centered">
            <p>
              {props.sameUsername
                ? `You don't have any products on your account. To create products press Add Product button and fill up modal form to create product.`
                : "This user don't have any products posted right now."}
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
