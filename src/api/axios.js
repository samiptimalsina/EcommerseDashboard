import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // Ensure correct path to the auth store

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8001/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
