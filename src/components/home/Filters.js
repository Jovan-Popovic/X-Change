import React from "react";

export const Filters = (props) => {
  return (
    <aside className="box menu column is-3">
      {/* <p className="label">Name</p>
      <div className="field has-addons has-addons-centered">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Find a repository"
          />
        </div>
        <div className="control">
          <a className="button is-info">Search</a>
        </div> 
  </div>*/}
      <p className="label">Categories</p>
      <div className="field ml-3">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" />
            &nbsp; Sport
          </label>
        </div>
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" />
            &nbsp; Education
          </label>
        </div>
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" />
            &nbsp; Electronics
          </label>
        </div>
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" />
            &nbsp; Chlothes
          </label>
        </div>
      </div>
      <p className="label">Location</p>
      <div className="field has-addons">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="country">
              <option value="Argentina">Podgorica</option>
              <option value="Bolivia">Cetinje</option>
              <option value="Brazil">Danilovgrad</option>
              <option value="Chile">Niksic</option>
              <option value="Colombia">Zabljak</option>
              <option value="Ecuador">Bar</option>
              <option value="Guyana">Tivat</option>
              <option value="Paraguay">Kotor</option>
            </select>
          </div>
        </div>
      </div>
      <p className="label">Minimum price & Maximum price</p>
      <div className="field">
        <p className="control columns is-mobile is-centered mt-3">
          <input
            className="input column is-5"
            type="number"
            min={1}
            max={5}
            placeholder="Min is 1"
          />
          <input
            className="input column is-5"
            type="number"
            min={1}
            max={5}
            placeholder="Max is 5"
          />
        </p>
      </div>
      <div className="field has-addons has-addons-centered">
        <button
          className="button is-primary mt-4"
          onClick={() =>
            alert(
              "This action will later show all products by selected filters"
            )
          }
        >
          <i className="fas fa-filter" />
          &nbsp; Search by Filters
        </button>
      </div>
    </aside>
  );
};
