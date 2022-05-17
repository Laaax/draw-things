import http from "../http-common";

class UserDataService {

  get(username) {
    return http.get(`/user/${username}`);
  }

  getUsername() {
    return http.get('/user/username');
  }

  create(data) {
    return http.post("/user/signup", data);
  }

  logIn(data) {
    return http.post("/user/login", data);
  }

  logOut() {
    return http.post("/user/logout");
  }

  setPicture(data) {
    return http.post("/user/setpic", data);
  }

  getAvatar(username) {
    return http.get(`/user/getavatar/${username}`);
  }

  findByTitle(title) {
    return http.get(`/user?title=${title}`);
  }

  checkUser(username) {
    return http.get(`/user/check/${username}`);
  }
}

export default new UserDataService();