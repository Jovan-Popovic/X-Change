import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Buy = (props) => {
  const [buy, getBuy] = React.useState([]);

  React.useEffect(() => {
    xChange("/transactions")
      .then((res) => getBuy(res.data.buy))
      .catch((error) => console.error(error));
  }, []);

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered">
        See all products that you have purchased
      </h2>
      <div className="columns is-multiline is-centered">
        {buy.map((product) => (
          <div key={product._id} className="card column is-3 mx-5 my-5">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src={product.productId.imageUrl} alt="" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image">
                    <img
                      src={product.seller.profilePictureUrl}
                      className="is-circle"
                      alt=""
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{product.productId.name}</p>
                  <p className="subtitle is-6">@{product.seller.username}</p>
                </div>
              </div>
              <div className="content">
                <p>Waiting for sellers response...</p>
                <p>
                  Boughted: <Moment date={product.createdAt} format="LLLL" />
                </p>
                <Link
                  className="button is-primary"
                  to={`product/${product.productId._id}`}
                >
                  <i className="fas fa-store-alt" /> &nbsp;Check store
                </Link>
                <button
                  className="button is-danger"
                  onClick={() => props.acceptRequest(product._id)}
                >
                  <i className="fas fa-trash-alt" />
                  &nbsp; Give up
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
