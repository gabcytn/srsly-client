import { defineStore } from "pinia";

type AuthState = {
  accessToken: string | null;
  isReady: boolean;
};

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: null,
    isReady: false,
  }),
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== null;
    },
  },
  actions: {
    async init() {
      const didLogout = localStorage.getItem("srsly:logged-out") === "true";
      if (didLogout) {
        return;
      }
      const res = await fetch(`${SERVER_URL}/public/auth/refresh-token`, {
        method: "POST",
        body: JSON.stringify({ deviceName: navigator.userAgent }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        console.error("error getting refresh token");
        console.error(`status code: ${res.status}`);
        const data = await res.json();
        if (data) {
          console.error(data);
        }
        this.logout();
        window.location.href = "/auth/login";
        return;
      }

      const data = await res.json();
      if (data.token) {
        this.setAccessToken(data.token);
        this.isReady = true;
        return;
      }

      throw new Error("Token not found.");
    },
    setAccessToken(token: string | null) {
      this.accessToken = token;
    },
    async login(email: string, password: string) {
      const res = await fetch(`${SERVER_URL}/public/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password, deviceName: navigator.userAgent }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error status code: ${res.status}`);
      }
      const data = await res.json();
      this.setAccessToken(data.token);
      localStorage.setItem("srsly:logged-out", "false");
    },
    async logout() {
      this.setAccessToken(null);
      localStorage.setItem("srsly:logged-out", "true");
      await fetch(`${SERVER_URL}/public/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
  },
});
