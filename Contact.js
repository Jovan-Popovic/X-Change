import React, { useState } from "react";
import profile from "../img/profile.png"
import location from "../img/location.png"
import review from "../img/review.png"
import settings from '../img/settings.png'



import { Drawer } from 'antd';
import 'antd/dist/antd.css'; 

const DrawerSettings = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <button className="settings-btn" type="primary" onClick={showDrawer}>
        <img src={settings} className="profile-sett" />
      </button>
      <Drawer
        title="Settings:"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="drawer-div">
        <a>Help</a>
        <a>About Developers</a>
        <a>Edit Profile</a>
        <a>Delete Account</a>
        </div>
      </Drawer>
    </>
  );
};





export const Contact = () => {
  return (
    <div className="profile-stats">
      <div>
        <img src={profile} className="profile-pic" />
      </div>

      <div className="stats-text">
        <strong>Username</strong>
        <p>Email</p>
        <p> <img src={location} /> Location</p>
        <a> <img src={review} /> Profile Review</a> {/* for start <a> in future <Link> */}
      </div>

      <div className="profile-end">
        <DrawerSettings />
      </div>

    </div>
  )
};
