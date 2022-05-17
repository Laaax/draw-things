import http from "../http-common";

class DrawingDataService {
  getAll(page) {
    return http.get(`/drawings?page=${page}`);
  }

  getDrawingCount() {
    return http.get("/drawings/count")
  }

  getDrawingsByUser(username, page) {
    return http.get(`drawings/${username}?page=${page}`);
  }

  getUserDrawingCount(username) {
    return http.get(`drawings/${username}/count`);
  }

  getDrawingById(id) {
    return http.get(`/drawings/drawing/${id}`);
  }

  rate(id, number) {
    return http.post(`/drawings/drawing/${id}?number=${number}`);
  }

  getRating(id) {
    return http.get(`drawings/drawing/${id}/rating`);
  }

  create(data) {
    return http.post("/drawings", data);
  }

  update(id, data) {
    return http.put(`/drawings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/drawings/drawing/${id}`);
  }

  deleteAll() {
    return http.delete(`/drawings`);
  }

  findByTitle(title) {
    return http.get(`/drawings?title=${title}`);
  }
}

export default new DrawingDataService();