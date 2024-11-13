import {jwtDecode} from "jwt-decode";
import apiClient from "./axiosConfig";

class AuthService {
  private static tokenKey = "token"; // Ключ для зберігання токену в localStorage

  // Метод для входу
  static async login(login: string, password: string): Promise<boolean> {
    try {
      const response = await apiClient.post<string>("/identity/token", {
        login,
        password,
      });
      localStorage.setItem(AuthService.tokenKey, response.data); // Збереження токену
      return true;
    } catch {
      return false; // Повертаємо false у разі помилки
    }
  }

  // Метод для виходу
  static logout(): void {
    localStorage.removeItem(AuthService.tokenKey); // Видалення токену з localStorage
  }

  // Перевірка, чи користувач аутентифікований
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.tokenKey); // Повертаємо true, якщо токен є
  }

  // Отримання токену
  static getToken(): string | null {
    return localStorage.getItem(AuthService.tokenKey); // Повертає токен або null, якщо токену немає
  }

  // Отримання userId з токену
  static getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: { userid: string } = jwtDecode(token);
    return decodedToken.userid; // Повертає userId або null
  }
}

export default AuthService;
