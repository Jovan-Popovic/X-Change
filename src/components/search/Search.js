/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filters } from "./Filters";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Search = (props) => {
  const { name } = sessionStorage;
  const [products, getMatchedProducts] = useState([]);
  const [render, reRender] = useState(false);
  const [filters, updateFilters] = useState({
    name: name,
    category: "",
    minPrice: 0,
    maxPrice: 5,
    sortBy: "date",
    sortOrder: -1,
  });
  const [initialFilters] = useState({ ...filters });

  React.useEffect(() => {
    const data = JSON.stringify({ ...filters });
    console.log(props);
    xChange
      .post("/findProduct", data)
      .then((res) => {
        console.log(res);
        getMatchedProducts([...res.data.matchingProducts]);
      })
      .catch((error) => console.error(error));
  }, [name, render]);

  const handleFilters = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    updateFilters({ ...filters, [key]: parseInt(value) || value });
  };

  const resetFilters = () => updateFilters({ ...initialFilters });

  return (
    <React.Fragment>
      <h1 className="title has-text-centered">
        Check products matched with "{sessionStorage.getItem("name")}"
      </h1>
      <div className="columns is-multiline is-centered">
        <Filters
          reRender={() => reRender(!render)}
          handleFilters={handleFilters}
          resetFilters={resetFilters}
        />
        {products.length ? (
          products.map((product) => (
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
                        <Link to={`/users/${product.user.username}`}>
                          @{product.user.username}
                        </Link>
                      ) : (
                        <Link
                          to="/"
                          onClick={() => {
                            props.toggleActiveStatus();
                            props.showNotification(
                              "You have to be logged in before checking user profile or products",
                              "is-info"
                            );
                          }}
                        >
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
                      className="button is-info"
                      to={`/products/${product._id}`}
                    >
                      <i className="fas fa-store-alt" />
                      &nbsp; View Store
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      className="button is-info"
                      onClick={() => {
                        props.toggleActiveStatus();
                        props.showNotification(
                          "You have to be logged in before checking user profile or products",
                          "is-info"
                        );
                      }}
                    >
                      <i className="fas fa-store-alt" />
                      &nbsp; View Store
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="modal-card-body has-text-centered">
            <p>There is no products matched with {name}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
