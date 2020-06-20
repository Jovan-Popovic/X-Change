import React from "react";


export const Chat = () => {
  return (
      <div className="delete-body">
        <div>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
          </span>
          <h3 className="deleteh3"><b>Delete Account?</b></h3>
          <p>You'll permanently loose your:</p>
          <ul>
            <li>1. Profile</li>
            <li>2. Messages</li>
            <li>3. Photos</li>
            <li>4. BookCoin</li>
          </ul>
          <div>
            <button className="cancel-btn">Cancel</button>
            <button className="delete-btn">Delete Account</button>
          </div>
        </div>
      </div>
  )
}