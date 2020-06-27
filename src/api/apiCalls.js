import axios from "axios";

const productsURL = "https://jsonplaceholder.typicode.com/photos";
const usersURL = "https://jsonplaceholder.typicode.com/users";
const booksURL = "https://book-sale-backend.herokuapp.com";

const products = axios.create({
  baseURL: productsURL,
  headers: { "Content-Type": "application/json */*" },
});
const users = axios.create({
  baseURL: usersURL,
  headers: { "Content-Type": "application/json */*" },
});
const books = axios.create({
  baseURL: booksURL,
  headers: { "Content-Type": "application/json" },
});

export { products, users, books };
