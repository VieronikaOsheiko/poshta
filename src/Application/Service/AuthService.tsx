import { jwtDecode } from "jwt-decode";
import {HttpClient} from "../HttpClient";
import { UserDto } from "../dto/UserDto";

class AuthService {
  private static tokenKey = "token";
  private static httpClient = new HttpClient({});


  static async login(login: string, password: string): Promise<boolean> {
    try {
      const response = await this.httpClient.post<string>("/identity/token", {
        login,
        password,
      });
      localStorage.setItem(this.tokenKey, response);
      return true;
    } catch {
      return false;
    }
  }


  static logout(): void {
    localStorage.removeItem(this.tokenKey);
  }


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

  static isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  static getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: { userid: string } = jwtDecode(token);
    return decodedToken.userid;
  }
}

export default AuthService;
