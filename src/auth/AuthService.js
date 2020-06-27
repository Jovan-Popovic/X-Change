import { books } from "../api/apiCalls";

class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("token");
    if (!!token) this.setJWT(token);
    return !!token ? true : false;
  };

  setJWT = (token) =>
    (books.defaults.headers.common["Authorization"] = `Bearer ${token}`);

  login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    this.setJWT(token);
  };
  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };
}
export const auth = new AuthService();
