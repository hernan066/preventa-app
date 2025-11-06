import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3030/api",
  baseURL: "https://api-distribuidora-ringo.up.railway.app/api",
});

export default api;