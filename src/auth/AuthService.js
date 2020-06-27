import { books } from "../api/apiCalls";

class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("token");
    if (!!token) this.setJWT(token);
    return !!token ? true : false;
  };

  setJWT = (token) =>
    (books.defaults.headers.common["Authorization"] = `Bearer ${token}`);

  login = (token) => {
    localStorage.setItem("token", token);
    this.setJWT(token);
  };
  logout = () => localStorage.removeItem("token");
}
export const auth = new AuthService();
