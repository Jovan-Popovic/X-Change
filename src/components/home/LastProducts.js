/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const LastProducts = (props) => {
  const [counter, increment] = useState(12);
  const [products, updateProducts] = useState([]);

  const getProducts = () =>
    xChange(`/getProducts/${counter}`)
      .then((res) => updateProducts(res.data.products))
      .catch((error) => console.error(error));

  /* const deleteProduct = (id) => {
    xChange(`/deleteProduct/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    props.renderComponent();
  };
 */
  React.useEffect(() => {
    getProducts(counter);
  }, [counter]);

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered">
        Chect out the newest products
      </h2>
      <div className="columns is-multiline is-centered">
        {products.map((product) => (
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
                    {props.isAuth ? (
                      <Link to={`/users/${product.user.username}`}>
                        <img
                          className="is-circle"
                          src={product.user.profilePictureUrl}
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link to="/" onClick={props.toggleActiveStatus}>
                        <img
                          className="is-circle"
                          src={product.user.profilePictureUrl}
                          alt=""
                        />
                      </Link>
                    )}
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{product.name}</p>
                  <p className="subtitle is-6">
                    {props.isAuth ? (
                      <Link to={`/users/${product.user.username}`}>
                        @{product.user.username}
                      </Link>
                    ) : (
                      <Link to="/" onClick={props.toggleActiveStatus}>
                        @{product.user.username}
                      </Link>
                    )}
                  </p>
                </div>
              </div>
              <div className="content">
                <p>Description: {product.description}</p>
                <p>
                  Created: <Moment date={product.createdAt} format="LLL" />
                </p>
                {props.isAuth ? (
                  <Link
                    className="button is-primary mr-3"
                    to={`/products/${product._id}`}
                  >
                    <i className="fas fa-store-alt" />
                    &nbsp; View Store
                  </Link>
                ) : (
                  <button
                    className="button is-primary"
                    onClick={props.toggleActiveStatus}
                  >
                    <i className="fas fa-store-alt" />
                    &nbsp; View Store
                  </button>
                )}
                {localStorage.getItem("admin") ? (
                  <button className="button is-danger">
                    <i className="fas fa-trash-alt" />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="is-horizontal-center">
        <button
          className="button is-info mb-5 non-btn"
          onClick={() => increment(counter + 12)}
        >
          <i className="fas fa-sync-alt" />
          &nbsp; Load More Products
        </button>
      </div>
    </React.Fragment>
  );
};
