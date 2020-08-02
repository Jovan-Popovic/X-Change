import React from "react";
import { xChange } from "../../api/apiCalls";

export const DeleteUser = (props) => {
  const { username, toggleActiveStatus } = props;
  const deleteUser = (username) =>
    xChange
      .delete(`/deleteUser/${username}`)
      .then((res) => {
        console.log(res);
        toggleActiveStatus();
        props.showNotification(
          `You've successfully deleted ${username}'s account`,
          "is-info"
        );
        props.reRender();
      })
      .catch((error) => console.error(error));

  return (
    <div className={`modal ${props.active ? "is-active" : ""}`}>
      <div className="modal-background" onClick={toggleActiveStatus}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete {username}</p>
          <button
            type="button"
            onClick={toggleActiveStatus}
            className="delete"
          />
        </header>
        <section className="modal-card-body has-text-centered">
          <p>Are you sure you want to delete {username}?</p>
          <p>
            Keep in mind that once you delete this profile, there is no going
            back - user will permanently lose all of his posted products, his
            reputation and bookcoins. Press Delete User to confirm this action.
          </p>
        </section>
        <footer className="modal-card-foot">
          <div className="control">
            <button
              type="submit"
              className="button is-danger"
              onClick={() => deleteUser(username)}
            >
              <i className="fas fa-trash-alt" />
              &nbsp; Delete User
            </button>
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
