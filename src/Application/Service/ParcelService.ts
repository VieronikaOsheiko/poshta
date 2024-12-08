import { HttpClient } from "../HttpClient";
import { ParcelDto } from "../dto/ParcelDto";

class ParcelService {
  private httpClient = new HttpClient({
    baseURL: "https://localhost:44371",
  });

  async getAll(): Promise<ParcelDto[]> {
    return await this.httpClient.get<ParcelDto[]>("/parcel");
  }

  async create(data: ParcelDto): Promise<ParcelDto> {
    return await this.httpClient.post<ParcelDto>("/parcel", data);
  }

  async update(data: ParcelDto): Promise<ParcelDto> {
    return await this.httpClient.put<ParcelDto>(`/parcel/${data.id}`, data);
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(`/parcel/${id}`);
  }
}

export default ParcelService;
