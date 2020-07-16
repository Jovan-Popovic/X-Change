/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";

export const Info = (props) => {
  const { info } = props;

  return (
    <div className="columns mb-6">
      <div className="container profile">
        <div className="section profile-heading">
          <div className="columns is-mobile is-multiline">
            <div className="column is-2 px-0 py-0">
              <figure className="image">
                <img
                  className="is-circle is-user"
                  src={
                    info.profilePictureUrl || require("../../img/profile.png")
                  }
                  alt=""
                />
              </figure>
            </div>
            <div className="column is-4-tablet is-10-mobile">
              <p>
                <span className="title is-bold">{info.username}</span>
                <br />
                {props.sameUsername ? (
                  <button
                    className="button is-primary my-3 mr-3"
                    onClick={() =>
                      props.toggleActiveStatus(
                        "updateProfile",
                        props.active.updateProfile
                      )
                    }
                  >
                    <i className="fas fa-user-edit" />
                    &nbsp; Edit Preferences
                  </button>
                ) : (
                  ""
                )}
              </p>
              <p className="tagline">
                Name: {info.firstName} {info.lastName}
              </p>
              <p className="tagline">Email: {info.email}</p>
              <p className="tagline is-capitalized">
                Location: {info.location || "Unknown"}
              </p>
              <p className="tagline">
                Phone Number: {info.phoneNumber || "Unknown"}
              </p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{info.bookCoinBalance}</p>
              <p className="stat-key">Bookcoin</p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{props.productsLength}</p>
              <p className="stat-key">Products</p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{info.reputation.toFixed(1)}</p>
              <p className="stat-key">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
