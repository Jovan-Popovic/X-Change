import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
const TableHeader = () => {
  return (
    <React.Fragment>
      <tr>
        <th className="has-text-centered">Num</th>
        <th className="has-text-centered">Username</th>
        <th className="has-text-centered">First Name</th>
        <th className="has-text-centered">Last Name</th>
        <th className="has-text-centered">Email Adress</th>
        <th className="has-text-centered">Location</th>
        <th className="has-text-centered">Phone</th>
        <th className="has-text-centered">Rating</th>
        <th className="has-text-centered">Admin</th>
        <th className="has-text-centered">Delete</th>
      </tr>
    </React.Fragment>
  );
};
export const Users = (props) => {
  const deleteUser = (username) =>
    xChange
      .delete(`/deleteUser/${username}`)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

  return (
    <div className="table-container">
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <tr key={index}>
              <th className="has-text-centered">{index + 1}</th>
              <td className="has-text-centered">
                <Link to={`/users/${user.username}`}>{user.username}</Link>
              </td>
              <td className="has-text-centered">{user.firstName}</td>
              <td className="has-text-centered">{user.lastName}</td>
              <td className="has-text-centered">{user.email || "Unknown"}</td>
              <td className="has-text-centered is-capitalized">
                {user.location || "Unknown"}
              </td>
              <td className="has-text-centered">
                {user.phoneNumber || "Unknown"}
              </td>
              <td className="has-text-centered">
                {user.reputation.toFixed(2)}
              </td>
              <td
                className={`has-text-centered ${
                  user.admin ? "is-success" : "is-danger"
                }`}
              >
                {user.admin ? "YES" : "NO"}
              </td>
              <td
                className={`has-text-centered ${
                  user.admin ? "is-success" : "is-danger"
                }`}
              >
                {user.username === localStorage.getItem("username") ? (
                  "You"
                ) : user.admin ? (
                  ""
                ) : (
                  <i
                    className="fas fa-times delete-user-icon"
                    onClick={() => deleteUser(user.username)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <TableHeader />
        </tfoot>
      </table>
    </div>
  );
};
