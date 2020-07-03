import React from "react";
import { books } from "../../api/apiCalls";

export const AddProduct = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = JSON.stringify({ ...props.data });
    const image = props.image;
    const imageData = new FormData();
    imageData.append("upfile", image, image.name);
    console.log(imageData);
    books
      .post("/createPost", productData)
      .then((res) => {
        console.log(res, imageData);
        const productId = res.data.product._id;
        return books.post(
          `/uploadImage/product?productId=${productId}`,
          imageData
        );
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <form id="addProduct" onSubmit={handleSubmit}>
      <div className={`modal ${props.active ? "is-active" : ""}`}>
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
                value={props.data.name}
                placeholder="Enter products name"
                onChange={props.handleInfo}
                required
              />
            </div>
            <label className="label">Description</label>
            <div className="control">
              <textarea
                name="description"
                className="textarea"
                value={props.data.description}
                placeholder="Add description to your product"
                onChange={props.handleInfo}
              />
            </div>
            <label className="label">Price (in bookcoins)</label>
            <div className="control">
              <input
                name="price"
                className="input"
                type="number"
                value={props.data.price}
                onChange={props.handleInfo}
                min={0}
                max={5}
                required
              />
            </div>
            <label className="label">Product Image</label>
            <div className="file">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="upfile"
                  accept="image/*"
                  onChange={props.handleFile}
                  required
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
              <select name="condition" onChange={props.handleInfo} required>
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
                value={props.data.age}
                onChange={props.handleInfo}
                min={0}
                required
              />
            </div>
            <label className="label">Category</label>
            <div className="control">
              <select
                className="select"
                name="category"
                onChange={props.handleInfo}
                required
              >
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
                value={props.data.quantity}
                onChange={props.handleInfo}
                min={0}
                required
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
