import api from "@/api/public";
import type { UserCredentials } from "@/DTO/UserCredentials";
import type { AuthResponse, JwtResponse } from "@/shared/types";

export const AuthService = {
  continueWithGithub: async (code: string) => {
    const data = (await api.post(`/public/auth/oauth/callback/github`, {
      code,
    })) as AuthResponse;

    return data;
  },
  continueWithGoogle: async (code: string) => {
    const data = (await api.post(`/public/auth/oauth/callback/google`, {
      code,
    })) as AuthResponse;

    return data;
  },
  refreshToken: async () => {
    const data = (await api.post("/public/auth/refresh-token", {
      deviceName: navigator.userAgent,
    })) as JwtResponse;

    return data;
  },
  logout: async () => {
    await api.post("/public/auth/logout");
  },
};
