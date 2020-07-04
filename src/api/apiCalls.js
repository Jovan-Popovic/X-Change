import axios from "axios";

const xChangeURL = "https://book-sale-backend.herokuapp.com";

export const xChange = axios.create({
  baseURL: xChangeURL,
  headers: { "Content-Type": "application/json" },
});
