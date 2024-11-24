import { HttpClient } from "../../../src/HttpClient";
import AuthService from "./AuthService";
import {
  UserDto,
  UserPhoneNumberDto
} from "../dto/UserDto";

class UserService {
  private httpClient = new HttpClient({
    baseURL: "https://localhost:44371",
  });

  async getAll(): Promise<UserDto[]> {
    return await this.httpClient.get<UserDto[]>("/users");
  }

  async getById(): Promise<UserDto> {
    const userId = AuthService.getUserIdFromToken();
    if (!userId) throw new Error("User is not authenticated");

    return await this.httpClient.get<UserDto>(`/getById/${userId}`);
  }

  async getPhoneNumberById(): Promise<UserPhoneNumberDto> {
    const userId = AuthService.getUserIdFromToken();
    if (!userId) throw new Error("User is not authenticated");

    return await this.httpClient.get<UserPhoneNumberDto>(
      `/getPhoneNumberById/${userId}`
    );
  }

  async create(data: UserDto): Promise<UserDto> {
    return await this.httpClient.post<UserDto>("/users", data);
  }

  async update(data: UserDto): Promise<UserDto> {
    const userId = AuthService.getUserIdFromToken();
    if (!userId) throw new Error("User is not authenticated");

    return await this.httpClient.put<UserDto>(`/update/${userId}`, data);
  }

  async delete(): Promise<void> {
    const userId = AuthService.getUserIdFromToken();
    if (!userId) throw new Error("User is not authenticated");

    await this.httpClient.delete(`/delete/${userId}`);
  }
}

export default new UserService();