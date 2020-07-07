import React from "react";
import { xChange } from "../../api/apiCalls";

export const AddComment = (props) => {
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
    if (comment.body.length > 30) {
      const commentData = JSON.stringify({ ...comment });
      console.log(commentData);
      xChange
        .post("/postComment", commentData)
        .then((res) => {
          console.log(res);
          updateComment({ ...comment, body: "" });
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="" />
        </p>
      </figure>
      <div className="media-content">
        <div className="field">
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
        <div className="field">
          <p className="control">
            <button className="button is-info" onClick={postComment}>
              <i className="fas fa-paper-plane" />
              &nbsp; Post Comment
            </button>
          </p>
        </div>
      </div>
    </article>
  );
};
