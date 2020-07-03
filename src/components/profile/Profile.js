/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import profilePicture from "../../img/profile.png";
import { AddProduct } from "../forms/AddProduct.js";
import { UpdateProfile } from "../forms/UpdateProfile";
import { books } from "../../api/apiCalls";

export const Profile = (props) => {
  const [profile, updateProfile] = React.useState({
    profileInfo: {},
    addProduct: {
      name: "",
      description: "Random description",
      price: 3,
      condition: "new",
      age: 0,
      category: "",
      quantity: 1,
    },
    updateProfile: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: 0,
      location: "podgorica",
    },
    images: {
      product: null,
      profile: null,
    },
  });

  React.useEffect(() => {
    books(`/findUser/${localStorage.getItem("username")}`)
      .then((res) => {
        const profileInfo = res.data.user;
        updateProfile({ ...profile, profileInfo });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInfo = (event) => {
    const form = event.target.closest(["#addProduct", "#updateProfile"]).id;
    const key = event.target.name;
    const value = event.target.value;
    updateProfile({ ...profile, [form]: { ...profile[form], [key]: value } });
  };

  const handleFile = (event) => {
    const form = event.target.closest(["#addProduct", "#updateProfile"]).id;
    const image = form === "addProduct" ? "product" : "profile";
    const upfile = event.target.files[0];
    updateProfile({
      ...profile,
      images: { ...profile.images, [image]: upfile },
    });
  };

  return (
    <div className="overflow">
      <div className="columns is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
        <div className="column is-one-third" id="picture">
          <figure className="image is-1by1">
            <img
              src={
                profile.profileInfo.profilePictureUrl
                  ? profile.profileInfo.profilePictureUrl
                  : profilePicture
              }
              className="is-rounded"
              alt=""
            />
          </figure>
        </div>
        <div className="column">
          <strong className="is-size-3-mobile is-size-2-tablet is-size-1-desktop">
            {profile.profileInfo.username}
          </strong>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            {profile.profileInfo.firstName} {profile.profileInfo.lastName}
          </p>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            <i className="fas fa-envelope" />
            Email: {profile.profileInfo.email}
          </p>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            <i className="fas fa-star" />
            Rating: {profile.profileInfo.ratings}
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
          data={profile.addProduct}
          image={profile.images.product}
          handleInfo={handleInfo}
          handleFile={handleFile}
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
          data={profile.updateProfile}
          image={profile.images.profile}
          handleInfo={handleInfo}
          handleFile={handleFile}
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
