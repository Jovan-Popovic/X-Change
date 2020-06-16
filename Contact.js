import React from "react";
import profile from "../img/profile.png"
import settings from "../img/settings.png"
import location from "../img/location.png"
import review from "../img/review.png"

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
        <a>
          <img src={settings} className="profile-sett" />
        </a>
      </div>

    </div>
  )
};
