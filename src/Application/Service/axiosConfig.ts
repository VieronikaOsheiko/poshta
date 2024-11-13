import axios from "axios";
import AuthService from "./AuthService"; // Імпорт AuthService для використання токенів

const apiClient = axios.create({
  baseURL: "https://localhost:44371/", // Базовий URL для API
  headers: {
    "Content-Type": "application/json",
  },
});

// Додаємо інтерсептор для автоматичного додавання токену до заголовків запитів
apiClient.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
