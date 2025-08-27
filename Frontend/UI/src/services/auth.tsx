// services/auth.tsx
import api from "./api";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user?: any; // optional, if backend returns user info
}

interface RegisterPayload {
  username: string; // instead of name
  email: string;
  password: string;
}


export const AuthService = {
  login: async (credentials: { username: string; password: string }) => {
    const res = await api.post("auth/login/", credentials)
    return res.data  // <-- IMPORTANT, only return the actual data
  },

  register: async (payload: RegisterPayload) => {
    const res = await api.post("auth/register/", payload);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  getAccessToken: () => localStorage.getItem("access_token"),
};
