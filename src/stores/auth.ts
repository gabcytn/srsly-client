import { UserBasicDetails } from "@/DTO/UserBasicDetails";
import type { UserCredentials } from "@/DTO/UserCredentials";
import router from "@/router";
import { AuthService } from "@/service/AuthService";
import type { AuthResponse, JwtResponse } from "@/shared/types";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "primevue";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const toast = useToast();
  const userDetails = ref<UserBasicDetails>();
  const accessToken = ref<string | undefined>();
  const isFormSubmitting = ref(false);

  function isAuthenticated() {
    return accessToken.value !== undefined;
  }

  async function init() {
    const didLogout = localStorage.getItem("srsly:logged-out") === "true";
    if (didLogout || isAuthenticated()) {
      return;
    }

    try {
      const data = await AuthService.refreshToken();
      setAccessToken(data.token);
    } catch {
      await handleInitError();
    }
  }

  async function handleInitError() {
    toast.add({
      severity: "error",
      summary: "Session expired",
      detail: "Please log in again.",
      life: 3000,
    });
    await logout();
    router.replace("/auth/login");
  }

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  function getAccessToken() {
    return accessToken.value;
  }

  function resetAccessToken() {
    accessToken.value = undefined;
  }

  async function login(credentials: UserCredentials) {
    try {
      isFormSubmitting.value = true;
      const data = await AuthService.login(credentials);
      initializeAuthState(data);
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
      initializeAuthState(data);
    } catch (e: unknown) {
      handleError(e);
    } finally {
      isFormSubmitting.value = false;
    }
  }

  function initializeAuthState(data: AuthResponse) {
    setAccessToken(data.jwtResponse.token);
    userDetails.value = new UserBasicDetails(data.email, data.isVerified);
    localStorage.setItem("srsly:logged-out", "false");
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
    await AuthService.logout();
  }

  return {
    isAuthenticated,
    isFormSubmitting,
    init,
    setAccessToken,
    getAccessToken,
    register,
    login,
    logout,
  };
});
