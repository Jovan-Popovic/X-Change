/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";

export const Notification = (props) => {
  /* React.useEffect(() => {
    setTimeout(props.toggleActiveStatus, 5000);
  }, []); */
  return (
    <div className="columns">
      <div
        className={`notification ${props.status} column is-mobile is-4 is-clearfix`}
      >
        <button className="delete" onClick={props.toggleActiveStatus} />
        {props.value}
      </div>
    </div>
  );
};
