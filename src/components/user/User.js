/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Info } from "./Info";
import { Products } from "./Products";
import { Comments } from "./Comments";
import { AddComment } from "./AddComment";
import { xChange } from "../../api/apiCalls";

export const User = (props) => {
  const [info, getInfo] = React.useState({});

  React.useEffect(() => {
    xChange(`/findUser/${props.computedMatch.params.username}`)
      .then((res) => {
        console.log(res.data.user);
        const profileInfo = res.data;
        getInfo({ ...profileInfo });
        console.log(info);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      {info.user ? (
        <Info info={info.user} productsLength={info.products.length} />
      ) : (
        ""
      )}
      {info.products ? <Products products={info.products} /> : ""}
      {info.comments ? <Comments comments={info.comments} /> : ""}
      {info.user ? <AddComment username={info.user.username} /> : ""}
    </React.Fragment>
  );
};
