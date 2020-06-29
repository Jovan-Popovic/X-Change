import React from "react";

export const Notification = (props) => {
  return (
    <div className="columns">
      <div className="notification is-primary column is-mobile is-clearfix is-pulled-right">
        <button className="delete" onClick={props.toggleActiveStatus} />
        {props.value}
      </div>
    </div>
  );
};
