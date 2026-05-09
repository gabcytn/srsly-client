import { useAuthStore } from "@/stores/auth";

export const AuthFacade = {
  setAccessToken: (token: string) => {
    const auth = useAuthStore();
    auth.setAccessToken(token);
  },

  logout: () => {
    const auth = useAuthStore();
    auth.logout();
  },

  getAccessToken: () => {
    const auth = useAuthStore();
    return auth.accessToken;
  },

  isAuthenticated: () => {
    const auth = useAuthStore();
    return auth.isAuthenticated();
  },
};
