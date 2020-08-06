/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import { profilePicture } from "../../img/profile.png";
import Moment from "react-moment";
import "moment-timezone";

export const Comments = (props) => {
  const { username, comments } = props;
  console.log(props);
  const [comment, updateComment] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const myComment =
    comments.filter(
      (comment) =>
        comment.postedBy.username === localStorage.getItem("username")
    )[0] || false;

  const updateCommentBody = (event) => {
    const body = event.target.value;
    updateComment(body);
  };

  const postComment = () => {
    const body = JSON.stringify({
      title: `${localStorage.getItem("username")}'s opinion on ${username}`,
      body: comment,
      username: username,
    });
    console.log(body);
    xChange
      .post("/postComment", body)
      .then((res) => {
        console.log(res);
        updateComment("");
        if (rating) addRating();
      })
      .catch((error) => console.error(error));
    props.reRender();
  };

  const editComment = () => {
    const body = JSON.stringify({
      title: `${localStorage.getItem("username")} new opinion on ${username}`,
      body: comment,
    });
    xChange
      .post(`/editComment/${myComment._id}`, body)
      .then((res) => {
        console.log(res);
        updateComment("");
        if (rating) addRating();
      })
      .catch((error) => console.error(error));
    props.reRender();
  };

  const deleteComment = (id) => {
    const body = { data: JSON.stringify({ commentId: id }) };
    xChange
      .delete("/deleteComment", body)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    props.reRender();
  };

  const addRating = () =>
    xChange(`/addRating/${username}/${rating}`)
      .then((res) => {
        console.log(res);
        setRating(null);
        props.reRender();
      })
      .catch((error) => console.error(error));

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        {props.sameUsername
          ? "See what other users think about you"
          : `Check what others think about ${username}`}
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
                    <a>
                      <i className="fas fa-heart" /> Like
                    </a>{" "}
                    ·{" "}
                    {comment.postedBy.username ===
                      localStorage.getItem("username") ||
                    localStorage.getItem("admin") ? (
                      <React.Fragment>
                        {" "}
                        <Link
                          to={window.location}
                          onClick={() => deleteComment(comment._id)}
                        >
                          <i className="fas fa-trash-alt" />
                          &nbsp; Delete
                        </Link>{" "}
                        ·{" "}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    <Moment
                      date={comment.updatedAt}
                      format="LLL"
                      className="mr-3"
                    />
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
              <img src={props.userImage} className="is-circle" alt="" />
            </p>
          </figure>
          <div className="media-content">
            <div className="field mr-2">
              <p className="control">
                <textarea
                  className="textarea"
                  name="comment"
                  value={comment}
                  onChange={updateCommentBody}
                  placeholder={
                    myComment ? "Edit comment..." : "Post a comment..."
                  }
                ></textarea>
              </p>
            </div>
            <div className="field mb-3">
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={myComment ? editComment : postComment}
                >
                  <i className="fas fa-paper-plane" />
                  &nbsp; {myComment ? "Edit" : "Post"} Comment
                </button>
                <p className="my-3">
                  Rate {username}: &nbsp; {rating || 0} &nbsp;
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <i
                        key={index}
                        className="fas fa-star"
                        value={ratingValue}
                        style={{
                          color:
                            ratingValue <= (hover || rating)
                              ? "#ffc020"
                              : "#e4e5e9",
                        }}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    );
                  })}
                </p>
              </div>
            </div>
          </div>
        </article>
      )}
    </React.Fragment>
  );
};
