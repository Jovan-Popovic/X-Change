/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";

export const Notification = (props) => {
  React.useEffect(() => {
    setTimeout(props.showNotification, 5000);
  }, []);

  return (
    <div className="columns">
      <div
        className={`notification ${props.status} column is-mobile is-4`}
      >
        <button className="delete" onClick={props.showNotification} />
        {props.value}
      </div>
    </div>
  );
};
