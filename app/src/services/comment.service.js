import http from "../http-common";

class CommentDataService {

  getCommentsByDrawing(drawing, page) {
    return http.get(`comments/${drawing}?page=${page}`);
  }

  getCommentCount(drawing) {
    return http.get(`comments/count/${drawing}`);
  }

  create(data) {
    return http.post("/comments", data);
  }

  delete(id) {
    return http.delete(`/comments/${id}`);
  }

}

export default new CommentDataService();