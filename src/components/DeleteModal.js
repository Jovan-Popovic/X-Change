import React from "react";
import { auth } from "../auth/AuthService";
import { xChange } from "../api/apiCalls";

export const DeleteModal = (props) => {
  const { username, _id, toggleActiveStatus } = props;
  const deleteUser = (username) =>
    xChange
      .delete(`/deleteUser/${username}`)
      .then((res) => {
        console.log(res);
        toggleActiveStatus();
        props.showNotification(
          localStorage.getItem("admin")
            ? `You've successfully deleted ${username}'s account`
            : "Your account is deleted, sorry to see you go ;(",
          "is-info"
        );
        if (localStorage.getItem("username") === username) {
          auth.logout();
          props.toggleAuthStatus(false);
        } else props.reRender();
      })
      .catch((error) => console.error(error));

  const deleteProduct = (id) => {
    xChange(`/deleteProduct/${id}`)
      .then((res) => {
        console.log(res);
        toggleActiveStatus();
        props.showNotification(
          "You've successfully deleted this product",
          "is-primary"
        );
        props.reRender();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={`modal ${props.active ? "is-active" : ""}`}>
      <div className="modal-background" onClick={toggleActiveStatus}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete {username || "Product"}?</p>
          <button
            type="button"
            onClick={toggleActiveStatus}
            className="delete"
          />
        </header>
        <section className="modal-card-body has-text-centered">
          <p>Are you sure you want to delete {username || "this product"}?</p>
          {localStorage.getItem("admin") && username ? (
            <p>
              Keep in mind that once you delete this account, there is no going
              back - user will permanently lose all of his posted products, his
              reputation and bookcoins. Press Delete User to confirm this
              action.
            </p>
          ) : username ? (
            <p>
              Keep in mind that once you delete your account, you will lose your
              reputation, all of your bookcoins, products and comments will be
              deleted.Press Delete Profile to confirm this action.
            </p>
          ) : (
            ""
          )}
        </section>
        <footer className="modal-card-foot">
          <div className="control">
            {username ? (
              <button
                type="submit"
                className="button is-danger"
                onClick={() => deleteUser(username)}
              >
                <i className="fas fa-trash-alt" />
                &nbsp; Delete Account
              </button>
            ) : (
              <button
                className="button is-danger"
                onClick={() => deleteProduct(_id)}
              >
                <i className="fas fa-trash-alt" />
                &nbsp; Delete Product
              </button>
            )}
            <button
              type="button"
              className="button is-success"
              onClick={toggleActiveStatus}
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
