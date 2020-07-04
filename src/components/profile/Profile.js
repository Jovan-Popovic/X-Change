/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import profilePicture from "../../img/profile.png";
import { AddProduct } from "../forms/AddProduct.js";
import { UpdateProfile } from "../forms/UpdateProfile";
import { xChange } from "../../api/apiCalls";

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
    <div className="overflow">
      <div className="columns is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
        <div className="column is-one-third" id="picture">
          <figure className="image is-1by1">
            <img
              src={
                info.profilePictureUrl ? info.profilePictureUrl : profilePicture
              }
              className="is-rounded"
              alt=""
            />
          </figure>
        </div>
        <div className="column">
          <strong className="is-size-3-mobile is-size-2-tablet is-size-1-desktop">
            {info.username}
          </strong>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            {info.firstName} {info.lastName}
          </p>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            <i className="fas fa-envelope" />
            Email: {info.email}
          </p>
          <p className="is-size-4-mobile is-size-4-tablet is-size-3-desktop">
            <i className="fas fa-star" />
            Rating: {info.ratings}
          </p>
        </div>
        <div className="column is-1">
          <button
            className="none-btn"
            onClick={() =>
              props.toggleActiveStatus(
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
            props.toggleActiveStatus("addProduct", props.active.addProduct)
          }
        >
          <i className="fas fa-plus" />
        </button>
      </div>
      {props.active.addProduct ? (
        <AddProduct
          active={props.active.addProduct}
          data={formData.addProduct}
          image={formData.images.product}
          handleInfo={handleInfo}
          handleFile={handleFile}
          toggleActiveStatus={() =>
            props.toggleActiveStatus(
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
          data={formData.updateProfile}
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
    </div>
  );
};
