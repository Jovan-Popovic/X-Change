import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import { DeleteModal } from "../DeleteModal";

export const Products = (props) => {
  const [active, setActive] = React.useState(false);
  const [id, setId] = React.useState("");
  const toggleActiveStatus = () => setActive(!active);

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered">
        Here you can see every product on our database
      </h2>
      <div className="columns is-multiline is-centered">
        {props.products.map((product) => (
          <div key={product._id} className="card column is-3 mx-5 my-5">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src={product.imageUrl} alt="" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image">
                    <Link to={`/users/${product.user.username}`}>
                      <img
                        className="is-circle"
                        src={product.user.profilePictureUrl}
                        alt=""
                      />
                    </Link>
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{product.name}</p>
                  <p className="subtitle is-6">
                    <Link to={`/users/${product.user.username}`}>
                      @{product.user.username}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="content">
                <p>Description: {product.description}</p>
                <p>Product Category: {product.category}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Product Age: {product.age}</p>
                <p>Product Price: {product.price}</p>
                <p>
                  Created: <Moment date={product.createdAt} format="LLL" />
                </p>
                <Link
                  className="button is-primary mr-3"
                  to={`/products/${product._id}`}
                >
                  <i className="fas fa-store-alt" />
                  &nbsp; View Store
                </Link>
                <button
                  className="button is-danger"
                  onClick={() => {
                    toggleActiveStatus();
                    setId(product._id);
                  }}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        active={active}
        _id={id}
        toggleActiveStatus={toggleActiveStatus}
        showNotification={props.showNotification}
        reRender={props.reRender}
      />
    </React.Fragment>
  );
};
