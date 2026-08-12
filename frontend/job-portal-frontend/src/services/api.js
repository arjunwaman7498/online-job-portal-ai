import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.20:5000/api",
  withCredentials: true,
});

export default API;