import React from "react";

export const NotFound = (props) => {
  return (
    <section className="section">
      <div className="container has-text-centered">
        <div className="columns is-centered">
          <div className="column is-7">
            <h1 className="title is-1">404</h1>
            <p className="subtitle is-3">Page not found</p>
            <p>
              Sorry, the page you are looking for doesn't exist, or you don't
              have permission to access it. Press the buton below to go back to
              home page.
            </p>
          </div>
        </div>
        <button
          className="button is-primary"
          onClick={() => props.history.push("/")}
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};
