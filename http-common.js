import axios from "axios";

export default axios.create({
  baseURL: "http://comrak.pythonanywhere.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
