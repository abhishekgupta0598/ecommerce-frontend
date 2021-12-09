export default class AuthService {
  static instance = null;
  authToken = null;
  user = null;

  static get() {
    if (AuthService.instance == null) {
      console.log("AuthService initializing");
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  login = (authToken, user) => {
    this.authToken = authToken;
    this.user = user;
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  logout = () => {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
    if (localStorage.getItem("token") === null) {
      console.log("clear");
      return true;
    }
    console.log("logout");
  };

  isAuthenticated() {
    if (this.authToken === null) {
      try {
        const authTokenFromStorage = localStorage.getItem("token");
        if (authTokenFromStorage) {
          this.authToken = authTokenFromStorage;
          this.user = JSON.parse(localStorage.getItem("user"));
        }
      } catch (e) {
        console.log(e);
        this.authToken = null;
        this.user = null;
      }
    }
    console.log("Auth token", this.authToken);
    return this.authToken;
  }

  getAuthToken() {
    if (!this.isAuthenticated()) {
      // throw Error("not authenticated");
    }
    return this.authToken;
  }

  getUser() {
    if (!this.isAuthenticated()) {
      throw Error("not authenticated");
      // return null;
      // console.log("error user");
    }
    return this.user;
  }

  token = () => {
    const authTokenFromStorage = localStorage.getItem("token");
    if (authTokenFromStorage !== null) {
      return true;
    } else {
      return false;
    }
  };
}
