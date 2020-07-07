/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import profilePicture from "../../img/profile.png";
import { AddProduct } from "./AddProduct.js";
import { UpdateProfile } from "./UpdateProfile";
import { xChange } from "../../api/apiCalls";
import { DeleteProfile } from "./DeleteProfile";

export const Profile = (props) => {
  const [info, getInfo] = React.useState({});
  const [formData, updateProfile] = React.useState({
    addProduct: {
      name: "",
      description: "Random description",
      price: 3,
      condition: "new",
      age: 0,
      category: "books",
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
    xChange(`/findUser/${localStorage.getItem("username")}`)
      .then((res) => {
        const profileInfo = res.data.user;
        getInfo({ ...profileInfo });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInfo = (event) => {
    const form = event.target.closest(["#addProduct", "#updateProfile"]).id;
    const key = event.target.name;
    const value = event.target.value;
    updateProfile({ ...formData, [form]: { ...formData[form], [key]: value } });
  };

  const handleFile = (event) => {
    const form = event.target.closest(["#addProduct", "#updateProfile"]).id;
    const image = form === "addProduct" ? "product" : "formData";
    const upfile = event.target.files[0];
    updateProfile({
      ...formData,
      images: { ...formData.images, [image]: upfile },
    });
  };

  return (
    <React.Fragment>
      <div className="columns">
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
                    <i className="fas fa-plus my-3" />
                    &nbsp; Add Product
                  </button>
                  <br />
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
                    : "Location Unknown"}
                </p>
                <p className="tagline">Phone Number: {info.phoneNumber}</p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">{info.bookCoinBalance}</p>
                <p className="stat-key">Bookcoin</p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">5</p>
                <p className="stat-key">Products</p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">{info.ratings}</p>
                <p className="stat-key">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.active.addProduct ? (
        <AddProduct
          active={props.active.addProduct}
          data={formData.addProduct}
          showNotification={props.showNotification}
          image={formData.images.product}
          handleInfo={handleInfo}
          handleFile={handleFile}
          toggleActiveStatus={() =>
            props.toggleActiveStatus("addProduct", props.active.addProduct)
          }
        />
      ) : (
        ""
      )}
      {props.active.updateProfile ? (
        <UpdateProfile
          active={props.active.updateProfile}
          data={formData.updateProfile}
          showNotification={props.showNotification}
          image={formData.images.profile}
          handleInfo={handleInfo}
          handleFile={handleFile}
          toggleActiveStatus={() =>
            props.toggleActiveStatus(
              "updateProfile",
              props.active.updateProfile
            )
          }
        />
      ) : (
        ""
      )}
      {props.active.deleteProfile ? (
        <DeleteProfile
          active={props.active.deleteProfile}
          toggleAuthStatus={props.toggleAuthStatus}
          history={props.history}
          toggleActiveStatus={() =>
            props.toggleActiveStatus(
              "deleteProfile",
              props.active.deleteProfile
            )
          }
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
