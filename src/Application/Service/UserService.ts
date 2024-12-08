import { HttpClient } from "../HttpClient";
import AuthService from "./AuthService";
import { UserDto, UserPhoneNumberDto } from "../dto/UserDto";

class UserService {
  private httpClient = new HttpClient({
    baseURL: "https://localhost:44371",
  });


  async getAll(): Promise<UserDto[]> {
    try {
      return await this.httpClient.get<UserDto[]>("/users");
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Не вдалося отримати список користувачів");
    }
  }

  async getById(): Promise<UserDto> {
    const userId = AuthService.getUserIdFromToken();
    if (!userId) {
      throw new Error("Користувач не авторизований");
    }

    try {
  
      return await this.httpClient.get<UserDto>(`/users/me`);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Не вдалося отримати дані користувача");
    }
  }


  async getPhoneNumberById(): Promise<UserPhoneNumberDto> {
    const userId = AuthService.getUserIdFromToken();
    if (!userId) {
      throw new Error("Користувач не авторизований");
    }

    try {
      return await this.httpClient.get<UserPhoneNumberDto>(`/users/me/phone`);
    } catch (error) {
      console.error("Error fetching phone number:", error);
      throw new Error("Не вдалося отримати номер телефону користувача");
    }
  }

  
  async create(data: UserDto): Promise<UserDto> {
    try {
      return await this.httpClient.post<UserDto>("/users", data);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Не вдалося створити користувача");
    }
  }


  async delete(userId: string): Promise<void> {
    try {
      await this.httpClient.delete(`/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Не вдалося видалити користувача");
    }
  }


  async update(data: UserDto): Promise<UserDto> {
    const userId = AuthService.getUserIdFromToken();
    if (!userId) {
      throw new Error("Користувач не авторизований");
    }

    try {
      return await this.httpClient.put<UserDto>(`/users/${userId}`, data);
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Не вдалося оновити дані користувача");
    }
  }
}

export default new UserService();
