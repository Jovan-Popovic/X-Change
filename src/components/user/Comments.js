/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Moment from "react-moment";
import "moment-timezone";

export const Comments = (props) => {
  const [allComments] = React.useState([...props.comments]);
  return (
    <React.Fragment>
      {console.log(allComments)}
      {allComments.map((comment) => (
        <article key={comment._id} className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img
                src={comment.postedBy ? comment.postedBy.profilePictureUrl : ""}
                alt=""
              />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>
                  {comment.postedBy ? comment.postedBy.username : ""}
                </strong>
                <br />
                {comment.body}
                <br />
                <small>
                  <a>Like</a> · <a>Reply</a> ·{" "}
                  <Moment date={comment.createdAt} format="LLL" />
                </small>
              </p>
            </div>
          </div>
        </article>
      ))}
    </React.Fragment>
  );
};
