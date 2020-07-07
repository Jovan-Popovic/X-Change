/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { profilePicture } from "../../img/profile.png";

export const Info = (props) => {
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
                    props.info.profilePictureUrl
                      ? props.info.profilePictureUrl
                      : profilePicture
                  }
                  alt=""
                />
              </span>
            </div>
            <div className="column is-4-tablet is-10-mobile">
              <p>
                <span className="title is-bold">{props.info.username}</span>
                <br />
              </p>
              <p className="tagline">
                Name: {props.info.firstName} {props.info.lastName}
              </p>
              <p className="tagline">Email: {props.info.email}</p>
              <p className="tagline">
                Location:{" "}
                {props.info.location
                  ? props.info.location[0]
                      .toUpperCase()
                      .concat(props.info.location.slice(1))
                  : "Location Unknown"}
              </p>
              <p className="tagline">
                Phone Number:{" "}
                {props.info.phoneNumber
                  ? props.info.phoneNumber
                  : "Phone Number Unknown"}
              </p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{props.info.bookCoinBalance}</p>
              <p className="stat-key">Bookcoin</p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{props.productsLength}</p>
              <p className="stat-key">
                {props.productsLength === 1 ? "Product" : "Products"}
              </p>
            </div>
            <div className="column is-2-tablet is-4-mobile has-text-centered">
              <p className="stat-val">{props.info.ratings}</p>
              <p className="stat-key">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
