import { xChange } from "../api/apiCalls";

class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("token");
    if (!!token) this.setJWT(token);
    return !!token ? true : false;
  };

  setJWT = (token) =>
    (xChange.defaults.headers.common["Authorization"] = `Bearer ${token}`);

  login = (token, username, admin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    if (admin) localStorage.setItem("admin", admin);
    this.setJWT(token);
  };

  logout = () => localStorage.clear();
}
export const auth = new AuthService();
