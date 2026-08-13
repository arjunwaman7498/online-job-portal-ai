import axios from "axios";

const API = axios.create({
  baseURL: "https://online-job-portal-ai.onrender.com/api",
  withCredentials: true,
});

export default API;