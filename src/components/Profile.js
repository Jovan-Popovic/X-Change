import React, { useState } from "react";
import profile from "../img/profile.png";
import phone from "../img/phone.png";
import review from "../img/review.png";
import settings from "../img/settings.png";
import addnew from "../img/add-new.png";
import { Drawer } from "antd";

const DrawerSettings = () => {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => setVisible(!visible);

  return (
    <React.Fragment>
      <button className="settings-btn" type="primary" onClick={toggleDrawer}>
        <img src={settings} alt="" className="profile-sett" />
      </button>
      <Drawer
        title="Settings:"
        placement="right"
        closable={false}
        onClose={toggleDrawer}
        visible={visible}
      >
        <div className="drawer-div">
          <a href>Help</a>
          <a href>About Developers</a>
          <a href>Edit Profile</a>
          <a href>Delete Account</a>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export const Profile = () => {
  return (
    <div>
      <div className="profile-stats">
        <div>
          <img src={profile} alt="" className="profile-pic" />
        </div>
        <div className="stats-text">
          <strong>Username</strong>
          <p>Email</p>
          <p>
            <img src={phone} alt="" /> Phone
          </p>
          <a href>
            <img src={review} alt="" />
            Profile rating
          </a>
        </div>
        <div className="profile-end">
          <DrawerSettings />
        </div>
      </div>
      <div className="for-add-new">
        <a href className="add-new">
          <img src={addnew} alt="" />
        </a>
      </div>
      <hr />
    </div>
  );
};
