/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import profilePicture from "../../img/profile.png";
import { AddProduct } from "../forms/AddProduct.js";
import { UpdateProfile } from "../forms/UpdateProfile";
import { books } from "../../api/apiCalls";
export const Profile = (props) => {
  
  const [profile, updateProfile] = React.useState({});

  React.useEffect(() => {
    books(`/findUser/${localStorage.getItem("username")}`)
      .then((res) => {
        console.log(res);
        updateProfile(res.data.user);
      })
      .then(() => console.log(this.state.userInfo))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="overflow">
      <div className="columns is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
        <div className="column is-one-third" id="picture">
          <figure className="image is-1by1">
            <img
              src={
                !!profile.profilePictureUrl
                  ? profile.profilePictureUrl
                  : profilePicture
              }
              className="is-rounded"
              alt=""
            />
          </figure>
        </div>
        <div className="column">
          <strong className="is-size-3-mobile is-size-2-tablet is-size-1-desktop">
            {profile.username}
          </strong>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            <i className="fas fa-envelope" />
            Email: {profile.email}
          </p>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            <i className="fas fa-star" />
            Rating: {profile.ratings}
          </p>
        </div>
        <div className="column is-1">
          <button
            className="none-btn"
            onClick={() =>
              props.toggleActiveStatus(
                "activeStatus",
                "updateProfile",
                props.active.updateProfile
              )
            }
          >
            <p className="is-size-4">
              <i className="fas fa-user-cog" />
            </p>
          </button>
        </div>
      </div>
      <div className="box has-text-centered">
        <button
          className="none-btn is-size-4"
          onClick={() =>
            props.toggleActiveStatus(
              "activeStatus",
              "addProduct",
              props.active.addProduct
            )
          }
        >
          <i className="fas fa-plus" />
        </button>
      </div>
      {props.active.addProduct ? (
        <AddProduct
          active={props.active.addProduct}
          data={props.addProduct}
          handleInfo={props.handleInfo}
          updateFile={props.updateFile}
          toggleActiveStatus={() =>
            props.toggleActiveStatus(
              "activeStatus",
              "addProduct",
              props.active.addProduct
            )
          }
        />
      ) : (
        ""
      )}
      {props.active.updateProfile ? (
        <UpdateProfile
          active={props.active.updateProfile}
          data={props.updateProfile}
          handleInfo={props.handleInfo}
          toggleActiveStatus={() =>
            props.toggleActiveStatus(
              "activeStatus",
              "updateProfile",
              props.active.updateProfile
            )
          }
        />
      ) : (
        ""
      )}
    </div>
  );
};
