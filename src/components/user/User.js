/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { Info } from "./Info";
import { Products } from "./Products";
import { Comments } from "./Comments";
import { AddProduct } from "./AddProduct.js";
import { UpdateProfile } from "./UpdateProfile";
import { DeleteProfile } from "./DeleteProfile";
import { xChange } from "../../api/apiCalls";

export const User = (props) => {
  const [info, getInfo] = useState({});
  const [userImage, setImage] = useState("");
  const [render, reRender] = useState(false);
  const [formData, updateProfile] = useState({
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
  const { username } = props.computedMatch.params;
  const sameUsername = username === localStorage.getItem("username");

  React.useEffect(() => {
    findUser();
  }, [render, username]);

  const findUser = () =>
    xChange(`/findUser/${username}`)
      .then((res) => {
        const profileInfo = res.data;
        getInfo({ ...profileInfo });
        return xChange(`/findUser/${localStorage.getItem("username")}`)
          .then((res) => setImage(res.data.user.profilePictureUrl))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.log(error));

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

  const renderComponent = () => reRender(!render);

  return (
    <React.Fragment>
      {info.user ? (
        <Info
          info={info.user}
          productsLength={info.products.length}
          active={props.active}
          toggleActiveStatus={props.toggleActiveStatus}
          sameUsername={sameUsername}
          renderComponent={renderComponent}
        />
      ) : (
        ""
      )}
      {info.products ? (
        <Products
          products={info.products}
          username={username}
          active={props.active}
          toggleActiveStatus={props.toggleActiveStatus}
          sameUsername={sameUsername}
          renderComponent={renderComponent}
        />
      ) : (
        ""
      )}
      {info.comments ? (
        <Comments
          comments={info.comments}
          username={username}
          userImage={userImage}
          active={props.active}
          toggleActiveStatus={props.toggleActiveStatus}
          sameUsername={sameUsername}
          renderComponent={renderComponent}
        />
      ) : (
        ""
      )}
      {/*Components below are for users with same username as username from local storage*/}
      {props.active.addProduct ? (
        <AddProduct
          active={props.active.addProduct}
          data={formData.addProduct}
          showNotification={props.showNotification}
          image={formData.images.product}
          handleInfo={handleInfo}
          handleFile={handleFile}
          renderComponent={renderComponent}
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
          renderComponent={renderComponent}
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
