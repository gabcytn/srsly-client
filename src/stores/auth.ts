import api from "@/api";
import { UserBasicDetails } from "@/DTO/UserBasicDetails";
import type { UserCredentials } from "@/DTO/UserCredentials";
import { AuthService } from "@/service/AuthService";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "primevue";
import { ref } from "vue";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = defineStore("auth", () => {
  const toast = useToast();
  const userDetails = ref<UserBasicDetails>();
  const accessToken = ref<string | undefined>();
  const isReady = ref(false);
  const isFormSubmitting = ref(false);

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

  function setUserDetails(user: UserBasicDetails) {
    userDetails.value = user;
  }

  async function login(credentials: UserCredentials) {
    try {
      isFormSubmitting.value = true;
      const data = await AuthService.login(credentials);
      setAccessToken(data.jwtResponse.token);
      setUserDetails(new UserBasicDetails(data.email, data.isVerified));
      localStorage.setItem("srsly:logged-out", "false");
    } catch (e: unknown) {
      handleError(e);
    } finally {
      isFormSubmitting.value = false;
    }
  }

  async function register(credentials: UserCredentials) {
    try {
      isFormSubmitting.value = true;
      const data = await AuthService.register(credentials);
      setAccessToken(data.jwtResponse.token);
      setUserDetails(new UserBasicDetails(data.email, data.isVerified));
      localStorage.setItem("srsly:logged-out", "false");
    } catch (e: unknown) {
      handleError(e);
    } finally {
      isFormSubmitting.value = false;
    }
  }

  function handleError(e: unknown) {
    let errorMessage = "Unknown error occured";
    if (e instanceof AxiosError) {
      errorMessage = e.response?.data.detail;
    }
    toast.add({
      severity: "error",
      summary: "Login Failed",
      detail: errorMessage,
      life: 3000,
    });
  }

  async function logout() {
    resetAccessToken();
    localStorage.setItem("srsly:logged-out", "true");
    await api.post("/public/auth/logout");
  }

  return {
    accessToken,
    isFormSubmitting,
    isReady,
    isAuthenticated,
    init,
    setAccessToken,
    register,
    login,
    logout,
  };
});
