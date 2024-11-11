import axios from "axios";
import AuthService from "../Application/AuthService";

const apiClient = axios.create({
  baseURL: "https://localhost:44371/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
