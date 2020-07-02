import axios from "axios";

const booksURL = "https://book-sale-backend.herokuapp.com";

export const books = axios.create({
  baseURL: booksURL,
  headers: { "Content-Type": "application/json" },
});
