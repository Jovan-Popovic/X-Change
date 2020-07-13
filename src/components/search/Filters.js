import React from "react";

export const Filters = (props) => {
  return (
    <aside className="box menu column is-3">
      <p className="label">Categories</p>
      <div className="field ml-3">
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="category"
              onClick={props.handleFilters}
              value=""
            />
            &nbsp; No Category
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="category"
              onClick={props.handleFilters}
              value="electronics"
            />
            &nbsp; Electronics
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="category"
              onClick={props.handleFilters}
              value="sport"
            />
            &nbsp; Sport
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="category"
              onClick={props.handleFilters}
              value="education"
            />
            &nbsp; Education
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="category"
              onClick={props.handleFilters}
              value="clothes"
            />
            &nbsp; Clothes
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="category"
              onClick={props.handleFilters}
              value="instrument"
            />
            &nbsp; Instrument
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="category"
              onClick={props.handleFilters}
              value="other"
            />
            &nbsp; Other
          </label>
        </div>
      </div>
      <p className="label">Location</p>
      <div className="field has-addons">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              name="location"
              defaultValue=""
              onChange={props.handleFilters}
            >
              <option value="">No Location</option>
              <option value="podgorica">Podgorica</option>
              <option value="cetinje">Cetinje</option>
              <option value="danilovgrad">Danilovgrad</option>
              <option value="niksic">Niksic</option>
              <option value="zabljak">Zabljak</option>
              <option value="bar">Bar</option>
              <option value="tivat">Tivat</option>
              <option value="kotor">Kotor</option>
            </select>
          </div>
        </div>
      </div>
      <p className="label">Minimum price & Maximum price</p>
      <div className="field">
        <p className="control columns is-mobile is-centered mt-3">
          <input
            className="input column is-5"
            name="minPrice"
            type="number"
            min={1}
            max={5}
            onChange={props.handleFilters}
            placeholder="Min is 1"
          />
          <input
            className="input column is-5"
            name="maxPrice"
            type="number"
            min={1}
            max={5}
            onChange={props.handleFilters}
            placeholder="Max is 5"
          />
        </p>
        <p className="label">Sort Products By</p>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select
                name="sortBy"
                defaultValue=""
                onChange={props.handleFilters}
              >
                <option value="date">Date Created</option>
                <option value="age">Product age</option>
                <option value="price">Product price</option>
              </select>
            </div>
          </div>
        </div>
        <p className="label">Sort Order</p>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select
                name="sortOrder"
                type="number"
                onChange={props.handleFilters}
              >
                <option value={-1}>Ascending</option>
                <option value={1}>Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="field has-addons has-addons-centered">
        <button className="button is-primary my-3" onClick={props.reRender}>
          <i className="fas fa-filter" />
          &nbsp; Apply Filters
        </button>
      </div>
      <div className="field has-addons has-addons-centered">
        <button
          className="button my-3"
          onClick={() => {
            props.resetFilters();
            props.reRender();
          }}
        >
          <i className="fas fa-times-circle" />
          &nbsp; Remove Filters
        </button>
      </div>
    </aside>
  );
};
