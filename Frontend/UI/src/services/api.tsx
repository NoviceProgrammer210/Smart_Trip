// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: false, // only true if using SessionAuth
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // saved on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // <-- FIX HERE
  }
  return config;
});

export default api;
