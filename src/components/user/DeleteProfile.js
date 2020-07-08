import React from "react";
import { xChange } from "../../api/apiCalls";
import { auth } from "../../auth/AuthService";

export const DeleteProfile = (props) => {
  const handleSubmit = () => {
    xChange
      .delete(`deleteUser/${localStorage.getItem("username")}`)
      .then((res) => {
        console.log(res);
        auth.logout();
        props.toggleAuthStatus(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div
      id="updateProfile"
      className={`modal ${props.active ? "is-active" : ""}`}
    >
      <div
        className="modal-background"
        onClick={props.toggleActiveStatus}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete Profile</p>
          <button
            type="button"
            onClick={props.toggleActiveStatus}
            className="delete"
          ></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <p>Are you sure you want to delete your account?</p>
          <p>
            Keep in mind that once you delete your profile, you will lose your
            reputation-rating, all of your bookcoins, all your products and all
            your comments will be deleted.
          </p>
        </section>
        <footer className="modal-card-foot">
          <div className="control">
            <button
              type="submit"
              className="button is-danger"
              onClick={handleSubmit}
            >
              <i className="fas fa-trash" />
              &nbsp; Delete Profile
            </button>
            <button
              type="button"
              className="button is-success"
              onClick={props.toggleActiveStatus}
            >
              <i className="fas fa-times" />
              &nbsp; Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
