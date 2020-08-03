/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../DeleteModal";
import Moment from "react-moment";
import "moment-timezone";

export const Products = (props) => {
  const [active, setActive] = React.useState(false);
  const [id, setId] = React.useState("");
  const { products } = props;

  const toggleActiveStatus = () => setActive(!active);

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered">
        {props.sameUsername ? (
          <React.Fragment>
            Check all your products
            <p className="has-text-centered mb-5">
              <button
                className="button is-info my-3 mr-3"
                onClick={() =>
                  props.toggleActiveStatus(
                    "addProduct",
                    props.active.addProduct
                  )
                }
              >
                <i className="fas fa-plus-circle my-3" />
                &nbsp; Add Product
              </button>
            </p>
          </React.Fragment>
        ) : (
          `Check all products from ${props.username}`
        )}
      </h2>
      <div className="box columns is-multiline is-centered mb-5">
        {products.length ? (
          products.map((product) => (
            <div key={product._id} className="card column is-3 mx-5 my-5">
              <div className="card-image">
                <figure className="image is-1by1">
                  <img src={product.imageUrl} alt="" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media"></div>
                <div className="content">
                  <p className="title is-4">{product.name}</p>
                  <p>Description: {product.description}</p>
                  <p>
                    Created At:{" "}
                    <Moment date={product.createdAt} format="LLLL" />
                  </p>
                  <Link
                    className="button is-primary mr-3"
                    to={`/products/${product._id}`}
                  >
                    <i className="fas fa-store-alt" /> &nbsp; Check store
                  </Link>
                  {props.sameUsername || localStorage.getItem("admin") ? (
                    <button
                      className="button is-danger"
                      onClick={() => {
                        setId(product._id);
                        toggleActiveStatus();
                      }}
                    >
                      <i className="fas fa-trash-alt" />
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
                ? "You don't have any products on your account. To create products press Add Product button and fill up modal form to create product."
                : "This user don't have any products posted right now."}
            </p>
          </div>
        )}
      </div>
      <DeleteModal
        active={active}
        _id={id}
        toggleActiveStatus={toggleActiveStatus}
        showNotification={props.showNotification}
        reRender={() => props.renderComponent()}
      />
    </React.Fragment>
  );
};
