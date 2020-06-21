import React, { useState } from "react";
import developer from "../img/profile.png"

import { Upload } from 'antd';

export const Delete = () => {
  return (
      <div className="delete-body">
        <div>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
          </span>
          <h3 className="deleteh3"><b>Delete Account?</b></h3>
          <p>You'll permanently loose your:</p>
          <ul>
            <li>1. Profile</li>
            <li>2. Messages</li>
            <li>3. Photos</li>
            <li>4. BookCoin</li>
          </ul>
          <div>
            <button className="cancel-btn">Cancel</button>
            <button className="delete-btn">Delete Account</button>
          </div>
        </div>
      </div>
  )
}

const Help = () => {
  return (
    <div className="set-body">
    <div className="top-set">
      <div>
        <h3>
          <b>
            Help
          </b>
        </h3>
      </div>
      <div className="link-div">
        <a className="set-link">Report a problem</a>
        <hr />
        <a className="set-link">Help Centre</a>
        <hr />
        <a className="set-link">Privacy and security help</a>
      </div>
    </div>
    </div>
  )
}


/* make product-maker */



/* add photo */



const Demo = () => {

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        onPreview={onPreview}
      >
        {'Upload'}
      </Upload>
  );
};


export const Chat = () => {
  return (
    <div className="product-make">
      <Demo />
    </div>
  )
}
