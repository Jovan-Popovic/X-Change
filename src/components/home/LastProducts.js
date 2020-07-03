import React from "react";
import { Link } from "react-router-dom";
import { books } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const LastProducts = () => {
  const [products, updateProducts] = React.useState([]);

  React.useEffect(() => {
    books("/getProducts/12").then((res) => {
      updateProducts(res.data.products);
    });
  }, []);

  return (
    <div className="columns is-multiline is-centered">
      {console.log(products)}
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
                <figure className="image is-48x48">
                  <img src={product.user.profilePictureUrl} alt="" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{product.name}</p>
                <p className="subtitle is-6">@{product.user.username}</p>
              </div>
            </div>
            <div className="content">
              <p>{product.description}</p>
              <p>
                Created: <Moment date={product.createdAt} format="LLL" />
              </p>
              <Link className="button is-info" to={`product/${product._id}`}>
                View More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
