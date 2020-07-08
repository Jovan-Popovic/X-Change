/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Comments = (props) => {
  const [allComments, getComments] = React.useState([...props.comments]);
  const [comment, updateComment] = React.useState({
    title: `${localStorage.getItem("username")}'s opinion on ${props.username}`,
    body: "",
    username: props.username,
  });

  React.useEffect(() => {
    getComments([...props.comments]);
  }, []);

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
  };

  const deleteComment = (id) => {
    console.log(id);
    xChange
      .delete("/deleteComment", { data: JSON.stringify({ commentId: id }) })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        {props.sameUsername
          ? "See what other users think about you"
          : `Check what others think about ${props.username}`}
      </h2>
      {allComments.map((comment) => (
        <article key={comment._id} className="media">
          <figure className="media-left ml-2">
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
      ))}
      {props.sameUsername ? (
        ""
      ) : (
        <article className="media">
          <figure className="media-left ml-2">
            <p className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt=""
              />
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
                <button className="button is-info" onClick={postComment}>
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
