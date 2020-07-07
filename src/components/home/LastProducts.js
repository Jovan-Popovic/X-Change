/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const LastProducts = (props) => {
  const [products, updateProducts] = React.useState([]);

  const getProducts = () =>
    xChange("/getProducts/12")
      .then((res) => {
        updateProducts(res.data.products);
        console.log(res);
      })
      .catch((error) => console.error(error));

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <React.Fragment>
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
                    <img
                      className="is-circle"
                      src={product.user.profilePictureUrl}
                      alt=""
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{product.name}</p>
                  <p className="subtitle is-6">
                    {props.isAuth ? (
                      <Link
                        to={
                          product.user.username !==
                          localStorage.getItem("username")
                            ? `/users/${product.user.username}`
                            : "/profile"
                        }
                      >
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
                <p>{product.description}</p>
                <p>
                  Created: <Moment date={product.createdAt} format="LLL" />
                </p>
                {props.isAuth ? (
                  <Link
                    className="button is-info"
                    to={`/products/${product._id}`}
                  >
                    <i className="fas fa-store-alt" />
                    &nbsp; View Store
                  </Link>
                ) : (
                  <button
                    className="button is-info"
                    onClick={props.toggleActiveStatus}
                  >
                    <i className="fas fa-store-alt" />
                    &nbsp; View Store
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="is-horizontal-center">
        <button
          className="button is-primary mb-5 non-btn"
          onClick={getProducts}
        >
          <i className="fas fa-sync-alt" />
          &nbsp; Load More Products
        </button>
      </div>
    </React.Fragment>
  );
};
