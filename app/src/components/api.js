import UserDataService from "../services/user.service";
import CommentDataService from "../services/comment.service";
import DrawingDataService from "../services/drawing.service";
import ResetPasswordDataService from "../services/resetPassword.service";


class Api {

  async createDrawing(title, description, author) {
    try {
      const res = await DrawingDataService.create({title, description, author});
      return res;
    } catch(err) {
      return(err);
    }
  }

  async deleteDrawingById(id) {
    try {
      const res = await DrawingDataService.delete(id);
      return res;
    } catch(err) {
      return(err);
    }
  }

  async getDrawingById(id) {
    try {
      const res = await DrawingDataService.getDrawingById(id);
      return res;
    } catch (err) {
    }
  }

  async getDrawings(p) {
    try {
      const res = await DrawingDataService.getAll(p);
      return res;
    } catch (err) {
    }
  }

  async getDrawingCount() {
    try {
      const res = await DrawingDataService.getDrawingCount();
      return res.data;
    } catch (err) {
    }
  }

  async getDrawingsByUser(username, page) {
    try {
      const res = await DrawingDataService.getDrawingsByUser(username, page);
      return res.data;
    } catch (err) {
    }
  }

  async getUserDrawingCount(username) {
    try {
      const res = await DrawingDataService.getUserDrawingCount(username);
      return res.data;
    } catch (err) {
    }
  }

  async createComment(drawing, description, author) {
    try {
    const res = await CommentDataService.create({ drawing, description, author });
    return res;
    } catch (err) {
      return err;
    }
  }

  async getComments(drawing, page) {
    try {
      const res = await CommentDataService.getCommentsByDrawing(drawing, page);
      return res.data;
    } catch (err) {
    }
  }

  async getCommentCount(drawing) {
    try {
      const res = await CommentDataService.getCommentCount(drawing);
      return res.data;
    } catch (err) {
    }
  }

  async rate(id, number) {
    try {
      const res = await DrawingDataService.rate(id, number);
    } catch (err) {
    }
  }

  async getRatings(id) {
    try {
      const res = await DrawingDataService.getRating(id);
      return res;
    } catch (err) {

    }
  }

  async getUsername() {
    try {
      const res = await UserDataService.getUsername();
      return res.data.message;
    } catch (err) {
      return (err);
    }
  }

  async logIn(username, password) {
    try {
      const res = await UserDataService.logIn({ username, password });
      return (res);
    } catch (err) {
      return (err);
    }
  }

  async logOut() {
    try {
      const res = await UserDataService.logOut();
      return (res);
    } catch (err) {
      return (err);
    }
  }

  async signUp(username, password, email) {
    try {
      const res = await UserDataService.create({ username, email, password });
      return (res);
    } catch (err) {
      return (err);
    }
  }

  async setPicture(picture) {
    try {
      const res = await UserDataService.setPicture({ picture });
      return (res);
    } catch (err) {
      return (err);
    }
  }

  async getAvatar(user) {
    try {
      const res = await UserDataService.getAvatar(user);
      if (res.data) {
        return (res.data);
      }
      return (null);
    } catch (err) {
      return (null);
    }
  }

  async resetPassword(email) {
    try {
      const res = await ResetPasswordDataService.reset({ email });
      return (res);
    } catch (err) {
      return (err);
    }
  }

  async checkResetLink(resetPasswordToken) {
    try {
      const res = await ResetPasswordDataService.checkResetLink({ resetPasswordToken });
      return (res);
    } catch (err) {
      return (err);
    }
  }

  async updatePassword(username, password) {
    try {
      const res = await ResetPasswordDataService.updatePassword({ username, password });
      return (res);
    } catch (err) {
      return (err);
    }
  }

  async checkUser(username) {
    try {
      const res = await UserDataService.checkUser(username);
      return (res);
    } catch (err) {
      return (err);
    }
  }

}

export default new Api();