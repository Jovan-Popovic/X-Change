/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { profilePicture } from "../../img/profile.png";

export const Info = (props) => {
  const [info] = React.useState({ ...props.info });

  return (
    <div className="columns mb-6">
      <div className="container profile">
        <div className="section profile-heading">
          <div className="columns is-mobile is-multiline">
            <div className="column is-2">
              <span className="header-icon user-profile-image">
                <img
                  className="profile"
                  src={
                    info.profilePictureUrl
                      ? info.profilePictureUrl
                      : profilePicture
                  }
                  alt=""
                />
              </span>
            </div>
            <div className="column is-4-tablet is-10-mobile">
              <p>
                <span className="title is-bold">{info.username}</span>
                <br />
                {props.sameUsername ? (
                  <React.Fragment>
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
                    <button
                      className="button is-danger my-3"
                      onClick={() =>
                        props.toggleActiveStatus(
                          "deleteProfile",
                          props.active.deleteProfile
                        )
                      }
                    >
                      <i className="fas fa-trash" />
                      &nbsp; Delete Profile
                    </button>
                    <button
                      className="button is-primary"
                      onClick={() =>
                        props.toggleActiveStatus(
                          "addProduct",
                          props.active.addProduct
                        )
                      }
                    >
                      <i className="fas fa-plus-circle my-3" />
                      &nbsp; Add Product
                    </button>
                    <br />
                  </React.Fragment>
                ) : (
                  ""
                )}
              </p>
              <p className="tagline">
                Name: {info.firstName} {info.lastName}
              </p>
              <p className="tagline">Email: {info.email}</p>
              <p className="tagline">
                Location:{" "}
                {info.location
                  ? info.location[0]
                      .toUpperCase()
                      .concat(info.location.slice(1))
                  : "Unknown"}
              </p>
              <p className="tagline">
                Phone Number: {info.phoneNumber ? info.phoneNumber : "Unknown"}
              </p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{info.bookCoinBalance}</p>
              <p className="stat-key">Bookcoin</p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{props.productsLength}</p>
              <p className="stat-key">
                {props.productsLength === 1 ? "Product" : "Products"}
              </p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{info.ratings}</p>
              <p className="stat-key">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
