import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use((response) => response.data);

export default api;
