import api from "@/api/public";
import type { UserCredentials } from "@/DTO/UserCredentials";
import type { AuthResponse, JwtResponse } from "@/shared/types";

export const AuthService = {
  login: async (credentials: UserCredentials) => {
    const [email, password] = [credentials.getEmail(), credentials.getPassword()];
    const data = (await api.post(`/public/auth/login`, {
      email,
      password,
      deviceName: navigator.userAgent,
    })) as AuthResponse;

    return data;
  },
  register: async (credentials: UserCredentials) => {
    const [email, password] = [credentials.getEmail(), credentials.getPassword()];
    const data = (await api.post(`/public/auth/register`, {
      email,
      password,
      deviceName: navigator.userAgent,
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
