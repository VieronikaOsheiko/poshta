import { HttpClient } from "../HttpClient";
import { CategoryDto } from "../dto/CategoryDto";

class CategoryService {
    private httpClient = new HttpClient({
      baseURL: "https://localhost:7266", 
    });
  
    async getAll(): Promise<CategoryDto[]> {
      return await this.httpClient.get<CategoryDto[]>("/category");
    }
  
    async getById(id: string): Promise<CategoryDto> {
      return await this.httpClient.get<CategoryDto>(`/category/${id}`);
    }
  
    async create(data: CategoryDto): Promise<CategoryDto> {
      return await this.httpClient.post<CategoryDto>("/category", data);
    }
  
    async update(data: CategoryDto): Promise<CategoryDto> {
      return await this.httpClient.put<CategoryDto>(`/category/${data.id}`, data);
    }
  
    async delete(id: string): Promise<void> {
      await this.httpClient.delete(`/category/${id}`);
    }
  }
  
  export default new CategoryService();