import { useAuthStore } from "@/stores/auth";
import axios from "axios";

type FailedQueue = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
};

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const auth = useAuthStore();

api.interceptors.request.use((config) => {
  if (auth.isAuthenticated) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: FailedQueue[] = [];

function resetFailedQueue() {
  failedQueue = [];
}

function rejectQueue(error: Error) {
  failedQueue.forEach((promise) => {
    promise.reject(error);
  });
  resetFailedQueue();
}

function resolveQueue(token: string) {
  failedQueue.forEach((promise) => {
    promise.resolve(token);
  });
  resetFailedQueue();
}

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    console.warn("original request");
    console.warn(originalRequest);

    if (error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue requests while refresh is happening
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err: Error) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await fetch(`${SERVER_URL}/public/auth/refresh-token`, {
          method: "POST",
          body: JSON.stringify({ deviceName: navigator.userAgent }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await res.json();
        const newToken = data.token;
        auth.setAccessToken(newToken);
        resolveQueue(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (!(refreshError instanceof Error)) {
          console.error("Unknown error thrown.");
          console.error(refreshError);
          return;
        }

        rejectQueue(refreshError);
        auth.logout();
        window.location.href = "/auth/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
