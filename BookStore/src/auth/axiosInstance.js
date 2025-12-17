import axios from "axios";
import { getToken, removeRoles, removeToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Accept-Language"] =
        localStorage.getItem("language") || "en";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
      await removeRoles();
      
      // Public paths that don't require auth - don't redirect
      const publicPaths = ["/", "/home", "/books", "/about", "/login", "/register"];
      const currentPath = window.location.pathname;
      const isPublicPath = publicPaths.some((path) =>
        path === "/" ? currentPath === "/" : currentPath.startsWith(path)
      );
      
      // Only redirect if on protected path
      if (!isPublicPath) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
