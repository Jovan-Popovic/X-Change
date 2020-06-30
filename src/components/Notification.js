import React from "react";

export const Notification = (props) => {
  return (
    <div
      className="columns"
      onLoad={() => setTimeout(props.toggleActiveStatus, 5000)}
    >
      <div
        className={`notification ${props.status} column is-mobile is-4 is-clearfix`}
      >
        <button className="delete" onClick={props.toggleActiveStatus} />
        {props.value}
      </div>
    </div>
  );
};
