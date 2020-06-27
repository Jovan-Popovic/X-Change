import React from "react";
import { books } from "../../api/apiCalls";

export const AddProduct = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let productData = JSON.stringify(props.addProductData);
    books.post("/createPost", productData).then((res) => console.log(res));
    console.log("Product created", productData);
  };

  return (
    <form id="addProduct" onSubmit={handleSubmit}>
      <div className={`modal ${props.addProductActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={props.toggleActiveStatus} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add new product</p>
            <button
              type="button"
              onClick={props.toggleActiveStatus}
              className="delete"
            ></button>
          </header>
          <section className="modal-card-body">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Enter products name"
                onChange={props.handleInfo}
              />
            </div>
            <label className="label">Description</label>
            <div className="control">
              <textarea
                name="description"
                className="textarea"
                placeholder="Add description to your product"
                onChange={props.handleInfo}
                defaultValue="Random description"
              />
            </div>
            <label className="label">Price (in bookcoins)</label>
            <div className="control">
              <input
                name="price"
                className="input"
                type="number"
                value={props.addProductData.price}
                onChange={props.handleInfo}
                min={0}
                max={5}
              />
            </div>
            <label className="label">Image</label>
            <div className="file">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={props.handleInfo}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Choose an image</span>
                </span>
              </label>
            </div>
            <label className="label">Condition</label>
            <div className="select">
              <select name="condition" onChange={props.handleInfo}>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="bad">Bad</option>
              </select>
            </div>
            <label className="label">Age</label>
            <div className="control">
              <input
                name="age"
                className="input"
                type="number"
                value={props.addProductData.age}
                onChange={props.handleInfo}
                min={0}
              />
            </div>
            <label className="label">Category</label>
            <div className="select">
              <select name="category" onChange={props.handleInfo}>
                <option value="books">Books</option>
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="other">Other...</option>
              </select>
            </div>
            <label className="label">Quantity</label>
            <div className="control">
              <input
                name="quantity"
                className="input"
                type="number"
                value={props.addProductData.quantity}
                onChange={props.handleInfo}
                min={0}
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="control">
              <button type="submit" className="button is-primary">
                <i className="fas fa-plus" />
                &nbsp; Add New Product
              </button>
              <button
                type="button"
                className="button is-danger"
                onClick={props.toggleActiveStatus}
              >
                <i className="fas fa-times" />
                &nbsp; Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
    </form>
  );
};
