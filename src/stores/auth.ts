import { defineStore } from "pinia";
import { ref } from "vue";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | undefined>();
  const isReady = ref(false);

  function isAuthenticated() {
    return accessToken.value !== undefined;
  }

  async function init() {
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
      logout();
      window.location.href = "/auth/login";
      return;
    }

    const data = await res.json();
    if (data.token) {
      setAccessToken(data.token);
      isReady.value = true;
      return;
    }

    throw new Error("Token not found.");
  }

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  function resetAccessToken() {
    accessToken.value = undefined;
  }

  async function login(email: string, password: string, action = "login") {
    const res = await fetch(`${SERVER_URL}/public/auth/${action}`, {
      method: "POST",
      body: JSON.stringify({ email, password, deviceName: navigator.userAgent }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json();
      if (data && data.detail) throw new Error(data.detail);
      throw new Error(`Error status code: ${res.status}`);
    }
    const data = await res.json();
    setAccessToken(data.token);
    localStorage.setItem("srsly:logged-out", "false");
  }

  async function register(email: string, password: string) {
    await login(email, password, "register");
  }

  async function logout() {
    resetAccessToken();
    localStorage.setItem("srsly:logged-out", "true");
    await fetch(`${SERVER_URL}/public/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  }

  return {
    accessToken,
    isReady,
    isAuthenticated,
    init,
    setAccessToken,
    login,
    register,
    logout,
  };
});
