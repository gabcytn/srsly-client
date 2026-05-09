import api from "@/api";
import type { UserCredentials } from "@/DTO/UserCredentials";
import type { AuthResponse } from "@/shared/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const AuthService = {
  authenticate: async (credentials: UserCredentials, path: "login" | "register") => {
    const [email, password] = [credentials.getEmail(), credentials.getPassword()];
    const data = (await api.post(`${SERVER_URL}/public/auth/${path}`, {
      email,
      password,
      deviceName: navigator.userAgent,
    })) as AuthResponse;

    return data;
  },
};
