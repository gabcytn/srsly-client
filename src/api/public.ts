import axios from "axios";
import { ToastEventBus, type ToastMessageOptions } from "primevue";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response.status === 429) {
      const toast = { add: (message: ToastMessageOptions) => ToastEventBus.emit("add", message) };
      toast.add({
        severity: "error",
        summary: "Too many requests",
        detail: "Try again later.",
        life: 3000,
      });
    }
  },
);

export default api;
