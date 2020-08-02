import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Products = (props) => {
  const deleteProduct = (id) => {
    xChange(`/deleteProduct/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    props.reRender();
  };

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
                <p>
                  Updated: <Moment date={product.updatedAt} format="LLL" />
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
                  onClick={() => deleteProduct(product._id)}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
