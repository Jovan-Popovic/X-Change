/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Product = (props) => {
  const [product, updateProduct] = useState({});

  React.useEffect(() => {
    xChange(`/products/${props.computedMatch.params.id}`)
      .then((res) => {
        console.log(res);
        updateProduct({ ...res.data.product });
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);

  const buyProduct = () =>
    xChange(`/products/${props.computedMatch.params.id}/buy`)
      .then((res) => {
        console.log(res);
        props.showNotification(
          `You have purchased ${product.name}, now you just have to wait for sellers response`,
          "is-info"
        );
      })
      .catch((error) => {
        console.error(error);
        props.showNotification(
          "You've already purchased this product, stop spamming Buy button",
          "is-warning"
        );
      });

  return (
    <div className="container">
      <section className="section">
        <div className="container">
          <div className="columns is-desktop is-vcentered">
            <div className="column is-6-desktop">
              <h2 className="title">{product.name}</h2>
              <p className="subtitle">
                <i className="fab fa-bitcoin" />
                &nbsp; Price: {product.price} Bookcoins
              </p>
              <p className="subtitle">{product.description}</p>
              <table className="table is-fullwidth">
                <tbody>
                  <tr>
                    <td>
                      <i className="fas fa-user-circle" />
                      &nbsp;Seller
                    </td>
                    <td className="has-text-right">
                      {product.user ? product.user.username : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fas fa-tag" />
                      &nbsp;Category
                    </td>
                    <td className="has-text-right">
                      {product.category
                        ? product.category[0].toUpperCase() +
                          product.category.slice(1)
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fas fa-star-half-alt" />
                      &nbsp;Condition
                    </td>
                    <td className="has-text-right">
                      {product.condition
                        ? product.condition[0].toUpperCase() +
                          product.condition.slice(1)
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fas fa-calendar-week" />
                      &nbsp;Created
                    </td>
                    <td className="has-text-right">
                      <Moment date={product.createdAt} format="LL" />
                    </td>
                  </tr>
                </tbody>
              </table>
              {localStorage.getItem("username") !==
              (product.user ? product.user.username : "") ? (
                <button
                  className="button is-primary"
                  onClick={() => {
                    buyProduct();
                  }}
                >
                  <i className="fas fa-shopping-cart" />
                  &nbsp; Buy Now!
                </button>
              ) : (
                <p>
                  <i className="fas fa-times" />
                  &nbsp; You can't buy your own product moron
                </p>
              )}
            </div>
            <div className="column is-6-desktop is-horizontal-center">
              <img src={product.imageUrl} alt="" className="product-image" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
