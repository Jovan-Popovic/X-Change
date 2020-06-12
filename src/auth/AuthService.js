class AuthService {
  isAuthenticated = false;
  getAuthStatus = () => this.isAuthenticated;
  login = () => (this.isAuthenticated = true);
  logout = () => (this.isAuthenticated = false);
}
export const auth = new AuthService();
