import { UserBasicDetails } from "@/DTO/UserBasicDetails";
import type { UserCredentials } from "@/DTO/UserCredentials";
import router from "@/router";
import { AuthService } from "@/service/AuthService";
import type { AuthResponse } from "@/shared/types";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "primevue";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const toast = useToast();
  const isInitialized = ref(false);
  const userDetails = ref<UserBasicDetails>();
  const accessToken = ref<string | undefined>();
  const isFormSubmitting = ref(false);

  function isAuthenticated() {
    return accessToken.value !== undefined;
  }

  async function init() {
    if (isAuthenticated() || isInitialized.value) {
      return;
    }

    try {
      const data = await AuthService.refreshToken();
      setAccessToken(data.token);
    } catch (e: unknown) {
      await handleInitError(e);
    } finally {
      isInitialized.value = true;
    }
  }

  async function handleInitError(e: unknown) {
    if (e instanceof AxiosError || e instanceof Error) {
      router.replace("/auth/login");
      return;
    }

    throw new Error("Unknown error");
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
  }

  function handleError(e: unknown) {
    let errorMessage = "Unknown error occured";
    if (e instanceof AxiosError) {
      errorMessage = e.response?.data.detail;
    }
    toast.add({
      severity: "error",
      summary: "Authentication Failed",
      detail: errorMessage,
      life: 3000,
    });
  }

  async function logout() {
    await AuthService.logout();
    resetAccessToken();
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
