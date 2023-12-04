import http from "../../http-common";

class MangaDataService {
  getAll() {
    return http.get("/mangas");
  }

  get(id) {
    return http.get(`/mangas/${id}`);
  }

  create(data) {
    return http.post("/mangas", data);
  }

  update(id, data) {
    return http.put(`/mangas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/mangas/${id}`);
  }

  deleteAll() {
    return http.delete(`/mangas`);
  }

  findByName(name) {
    return http.get(`/mangas?name=${name}`);
  }
}

export default new MangaDataService();
