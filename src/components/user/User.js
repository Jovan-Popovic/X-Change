/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { Info } from "./Info";
import { Products } from "./Products";
import { Comments } from "./Comments";
import { AddProduct } from "./AddProduct.js";
import { UpdateProfile } from "./UpdateProfile";
import { DeleteModal } from "../DeleteModal";
import { xChange } from "../../api/apiCalls";

export const User = (props) => {
  const [info, getInfo] = useState({});
  const [active, setActive] = useState({
    addProduct: false,
    updateProfile: false,
    deleteProfile: false,
  });
  const [userImage, setImage] = useState("");
  const [render, setRender] = useState(false);
  const [formData, updateProfile] = useState({
    addProduct: {
      name: "",
      description: "Random description",
      price: 3,
      condition: "new",
      age: 0,
      category: "electronics",
      quantity: 1,
    },
    updateProfile: {},
    images: {
      product: null,
      profile: null,
    },
  });
  const { username } = props.computedMatch.params;
  const sameUsername = username === localStorage.getItem("username");

  React.useEffect(() => {
    setTimeout(findUser, 100);
  }, [render, username]);

  const findUser = () =>
    xChange(`/findUser/${username}`)
      .then((res) => {
        console.log(res);
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

  const toggleActiveStatus = (value, status) =>
    setActive({ ...active, [value]: !status });

  const reRender = () => setRender(!render);

  return (
    <React.Fragment>
      {info.user ? (
        <Info
          info={info.user}
          productsLength={info.products.length}
          active={active}
          toggleActiveStatus={toggleActiveStatus}
          sameUsername={sameUsername}
          reRender={reRender}
        />
      ) : (
        ""
      )}
      {info.products ? (
        <Products
          products={info.products}
          username={username}
          active={active}
          toggleActiveStatus={toggleActiveStatus}
          sameUsername={sameUsername}
          showNotification={props.showNotification}
          reRender={reRender}
        />
      ) : (
        ""
      )}
      {info.comments ? (
        <Comments
          comments={info.comments}
          username={username}
          userImage={userImage}
          admin={info.user.admin}
          active={active}
          toggleActiveStatus={toggleActiveStatus}
          sameUsername={sameUsername}
          reRender={reRender}
        />
      ) : (
        ""
      )}
      {active.addProduct ? (
        <AddProduct
          active={active.addProduct}
          data={formData.addProduct}
          showNotification={props.showNotification}
          image={formData.images.product}
          handleInfo={handleInfo}
          handleFile={handleFile}
          reRender={reRender}
          toggleActiveStatus={() =>
            toggleActiveStatus("addProduct", active.addProduct)
          }
        />
      ) : (
        ""
      )}
      {active.updateProfile ? (
        <UpdateProfile
          active={active.updateProfile}
          data={formData.updateProfile}
          showNotification={props.showNotification}
          image={formData.images.profile}
          handleInfo={handleInfo}
          handleFile={handleFile}
          reRender={reRender}
          toggleActiveStatus={() =>
            toggleActiveStatus("updateProfile", active.updateProfile)
          }
        />
      ) : (
        ""
      )}
      {active.deleteProfile ? (
        <DeleteModal
          active={active.deleteProfile}
          toggleAuthStatus={props.toggleAuthStatus}
          reRender={reRender}
          showNotification={props.showNotification}
          username={username}
          history={props.history}
          toggleActiveStatus={() =>
            toggleActiveStatus("deleteProfile", active.deleteProfile)
          }
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
