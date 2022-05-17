import http from "../http-common";

class ResetPasswordDataService {
  // data is email
  reset(data) {
    return http.post('/reset', data);
  }

  checkResetLink(token) {
    return http.get(`/reset/check?resetPasswordToken=${token.resetPasswordToken}`);
  }

  // email and new password
  updatePassword(data) {
    return http.post('/reset/update', data);
  }
}

export default new ResetPasswordDataService();