/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import { books } from "../../api/apiCalls";

export const Product = (props) => {
  const [product, updateProduct] = React.useState({});

  React.useEffect(() => {
    books(`/products/${props.computedMatch.params.id}`)
      .then((res) => {
        console.log(res);
        updateProduct(res.data.product);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <h1>
        Welcome to Product Route, product id is:
        {product._id}
      </h1>
      <Link className="button is-primary" to="/">
        Go back to Home page
      </Link>
    </div>
  );
};
