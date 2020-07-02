import React from "react";
import { Link } from "react-router-dom";
import { books } from "../../api/apiCalls";

export const LastProducts = () => {
  const [products, updateProducts] = React.useState([]);

  React.useEffect(() => {
    books("/getProducts/12").then((res) => {
      updateProducts(res.data.products);
      console.log(res, products);
    });
  }, []);

  return (
    <div className="columns is-multiline">
      {products.map((product) => (
        <div key={product._id} className="card column is-3">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={product.imageUrl} alt="" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={product.user.profilePictureUrl} alt="" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{product.name}</p>
                <p className="subtitle is-6">{product.category}</p>
              </div>
            </div>
            <div className="content">
              <p>{product.description}</p>
              <br />
              <Link className="button is-info" to={`product/${product._id}`}>
                View More
              </Link>
              <time dateTime="2016-1-1">Created at: {product.createdAt}</time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
