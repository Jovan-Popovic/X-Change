import React from "react";
import { books } from "../../api/apiCalls";

export const UpdateProfile = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const updateData = JSON.stringify({ ...props.data });
    const image = props.image;
    const imageData = new FormData();
    imageData.append("upfile", image, image.name);
    console.log(imageData);
    books
      .post("/updateProfile", updateData)
      .then(
        (res) => console.log(res)
        /*         return books.post("/uploadImage/user", image);
         */
      )
      .catch((error) => console.error(error));
  };
  return (
    <form id="updateProfile" onSubmit={handleSubmit}>
      <div className={`modal ${props.active ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={props.toggleActiveStatus}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Update Profile</p>
            <button
              type="button"
              onClick={props.toggleActiveStatus}
              className="delete"
            ></button>
          </header>
          <section className="modal-card-body">
            <label className="label">First Name</label>
            <div className="control">
              <input
                name="firstName"
                className="input"
                type="text"
                value={props.data.firstName}
                placeholder="Enter new First Name"
                onChange={props.handleInfo}
                required
              />
            </div>
            <label className="label">Last Name</label>
            <div className="control">
              <input
                name="lastName"
                className="input"
                type="text"
                value={props.data.lastName}
                placeholder="Enter new Last Name"
                onChange={props.handleInfo}
                required
              />
            </div>
            <label className="label">Email</label>
            <div className="control">
              <input
                name="email"
                className="input"
                type="email"
                value={props.data.email}
                placeholder="Enter your new email adress"
                onChange={props.handleInfo}
                required
              />
            </div>
            <label className="label">Phone Number</label>
            <div className="control">
              <input
                className="input"
                name="phoneNumber"
                value={props.data.phoneNumber}
                onChange={props.handleInfo}
                type="tel"
                placeholder="Your new phone number"
              />
            </div>
            <label className="label">Location</label>
            <div className="control">
              <div className="select">
                <select name="location" onChange={props.handleInfo}>
                  <option value="podgorica">Podgorica</option>
                  <option value="danilovgrad">Danilovgrad</option>
                  <option value="cetinje">Cetinje</option>
                  <option value="niksic">Niksic</option>
                </select>
              </div>
            </div>
            <label className="label">New Image</label>
            <div className="file">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="upfile"
                  accept="image/*"
                  onChange={props.handleFile}
                  required
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Choose New Image</span>
                </span>
              </label>
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="control">
              <button type="submit" className="button is-primary">
                <i className="fas fa-user-edit" />
                &nbsp; Edit profile
              </button>
              <button
                type="button"
                className="button is-danger"
                onClick={props.toggleActiveStatus}
              >
                <i className="fas fa-times" />
                &nbsp; Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
    </form>
  );
};
