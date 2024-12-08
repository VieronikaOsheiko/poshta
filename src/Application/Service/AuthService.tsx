import { jwtDecode } from "jwt-decode";
import {HttpClient} from "../HttpClient";
import { UserDto } from "../dto/UserDto";

class AuthService {
  private static tokenKey = "token"; // Ключ для зберігання токену в localStorage
  private static httpClient = new HttpClient({}); // Ініціалізація HttpClient

  // Метод для входу
  static async login(login: string, password: string): Promise<boolean> {
    try {
      const response = await this.httpClient.post<string>("/identity/token", {
        login,
        password,
      });
      localStorage.setItem(this.tokenKey, response); // Збереження токену
      return true;
    } catch {
      return false; // Повертаємо false у разі помилки
    }
  }

  // Метод для виходу
  static logout(): void {
    localStorage.removeItem(this.tokenKey); // Видалення токену з localStorage
  }

  // Метод для отримання поточного користувача
  static async getCurrentUser(): Promise<UserDto> {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      throw new Error("Користувач не авторизований");
    }

    try {
      const response = await this.httpClient.get<UserDto>(`/users/me`);
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Не вдалося отримати дані користувача");
    }
  }

  // Перевірка, чи користувач аутентифікований
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Повертаємо true, якщо токен є
  }

  // Отримання токену
  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Повертає токен або null, якщо токену немає
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
