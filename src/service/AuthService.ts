import api from "@/api";
import type { UserCredentials } from "@/DTO/UserCredentials";
import type { AuthResponse } from "@/shared/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const AuthService = {
  login: async (credentials: UserCredentials) => {
    const [email, password] = [credentials.getEmail(), credentials.getPassword()];
    const data = (await api.post(`${SERVER_URL}/public/auth/login`, {
      email,
      password,
      deviceName: navigator.userAgent,
    })) as AuthResponse;

    return data;
  },
  register: async (credentials: UserCredentials) => {
    const [email, password] = [credentials.getEmail(), credentials.getPassword()];
    const data = (await api.post(`${SERVER_URL}/public/auth/register`, {
      email,
      password,
      deviceName: navigator.userAgent,
    })) as AuthResponse;

    return data;
  },
};
