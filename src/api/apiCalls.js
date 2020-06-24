import axios from "axios";

const productsURL = "https://jsonplaceholder.typicode.com/photos";
const usersURL = "https://jsonplaceholder.typicode.com/users"

export const products = axios.create({
  baseURL: productsURL,
  headers: { "Content-Type": "aplication/json */*" },
});
export const users = axios.create({
  baseURL: usersURL,
  headers: { "Content-Type": "aplication/json */*" },
});
