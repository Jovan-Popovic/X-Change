import React from "react";

export const Filters = (props) => {
  const categories = [
    "",
    "electronics",
    "sport",
    "books",
    "clothes",
    "instrument",
    "other",
  ];

  return (
    <aside className="box menu column is-3 mx-5 my-5">
      <div className="field ml-3">
        <p className="menu-label">Categories</p>
        {categories.map((category, index) => (
          <div className="control" key={index}>
            <label className="radio is-capitalized">
              <input
                type="radio"
                name="category"
                onClick={props.handleFilters}
                value={category}
                defaultChecked={category === ""}
              />
              &nbsp; {category || "No Category"}
            </label>
          </div>
        ))}
      </div>
      <p className="menu-label">Product Condition</p>
      <div className="field has-addons">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              name="condition"
              defaultValue=""
              onChange={props.handleFilters}
            >
              <option value="">All Conditions</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="bad">Bad</option>
            </select>
          </div>
        </div>
      </div>
      <p className="menu-label">Location</p>
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
      <p className="menu-label">Minimum price & Maximum price</p>
      <div className="field">
        <p className="control columns is-mobile is-centered my-3">
          <input
            className="input column is-5 mr-5"
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
        <p className="menu-label">Sort Products By</p>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select
                name="sortBy"
                defaultValue="date"
                onChange={props.handleFilters}
              >
                <option value="date">Date Created</option>
                <option value="age">Product age</option>
                <option value="price">Product price</option>
              </select>
            </div>
          </div>
        </div>
        <p className="menu-label">Sort Order</p>
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
      <p className="has-text-centered my-4">
        <button className="button is-info" onClick={props.reRender}>
          <i className="fas fa-filter" />
          &nbsp; Apply Filters
        </button>
      </p>
      <p className="has-text-centered my-4">
        <button className="button is-light" onClick={props.resetFilters}>
          <i className="fas fa-times-circle" />
          &nbsp; Remove Filters
        </button>
      </p>
    </aside>
  );
};
