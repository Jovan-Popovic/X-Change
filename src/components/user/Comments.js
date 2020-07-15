/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import { profilePicture } from "../../img/profile.png";
import Moment from "react-moment";
import "moment-timezone";

export const Comments = (props) => {
  const [comment, updateComment] = React.useState({
    title: `${localStorage.getItem("username")}'s opinion on ${props.username}`,
    body: "",
    username: props.username,
  });

  const updateCommentBody = (event) => {
    const body = event.target.value;
    updateComment({ ...comment, body });
  };

  const postComment = () => {
    const commentData = JSON.stringify({ ...comment });
    console.log(commentData);
    xChange
      .post("/postComment", commentData)
      .then((res) => {
        console.log(res);
        updateComment({ ...comment, body: "" });
      })
      .catch((error) => console.error(error));
    props.renderComponent();
  };

  const deleteComment = (id) => {
    console.log(id);
    const body = { data: JSON.stringify({ commentId: id }) };
    xChange
      .delete("/deleteComment", body)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    props.renderComponent();
  };

  const comments = props.comments;

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        {props.sameUsername
          ? "See what other users think about you"
          : `Check what others think about ${props.username}`}
      </h2>
      {comments.length ? (
        comments.map((comment) => (
          <article key={comment._id} className="media">
            <figure className="media-left ml-2">
              <p className="image is-64x64">
                <Link to={`/users/${comment.postedBy.username}`}>
                  <img
                    className="is-circle"
                    src={comment.postedBy.profilePictureUrl || profilePicture}
                    alt=""
                  />
                </Link>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <Link to={`/users/${comment.postedBy.username}`}>
                    <strong>@{comment.postedBy.username}</strong>
                  </Link>
                  <br />
                  {comment.body}
                  <br />
                  <small>
                    <a>Like</a> · <a>Reply</a> ·{" "}
                    <Moment date={comment.createdAt} format="LLL" /> &nbsp;
                    {comment.postedBy.username ===
                    localStorage.getItem("username") ? (
                      <a onClick={() => deleteComment(comment._id)}>
                        <i className="fas fa-trash" /> &nbsp; Delete Comment
                      </a>
                    ) : (
                      ""
                    )}
                  </small>
                </p>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="modal-card-body has-text-centered">
          <p>There is no comments</p>
        </div>
      )}
      {props.sameUsername ? (
        <p className="has-text-centered my-5">
          <button
            className="button is-danger"
            onClick={() =>
              props.toggleActiveStatus(
                "deleteProfile",
                props.active.deleteProfile
              )
            }
          >
            <i className="fas fa-trash-alt" />
            &nbsp; Delete Profile
          </button>
        </p>
      ) : (
        <article className="media">
          <figure className="media-left ml-2">
            <p className="image is-64x64">
              <img src={props.userImage} alt="" />
            </p>
          </figure>
          <div className="media-content">
            <div className="field mr-2">
              <p className="control">
                <textarea
                  className="textarea"
                  name="body"
                  value={comment.body}
                  onChange={updateCommentBody}
                  placeholder="Post a comment..."
                ></textarea>
              </p>
            </div>
            <div className="field mb-3">
              <p className="control">
                <button className="button is-primary" onClick={postComment}>
                  <i className="fas fa-paper-plane" />
                  &nbsp; Post Comment
                </button>
              </p>
            </div>
          </div>
        </article>
      )}
    </React.Fragment>
  );
};
