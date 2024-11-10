import { GenericAbortSignal } from "axios";
import { AxiosHttpClient } from "../../../utils/Http/AxiosHttpClient";


interface PaginatedResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

type CreateTodoRequest = Omit<Todo, "id">;
type UpdateTodoRequest = Todo;
type DeleteTodoResponse = Todo & {
  isDeleted: boolean;
  deletedOn: Date | string;
};

interface PaginatedTodoResponse extends PaginatedResponse {
  todos: Todo[];
}

export class TodoService {
  private httpClient: AxiosHttpClient;

  constructor(signal?: GenericAbortSignal) {
    this.httpClient = new AxiosHttpClient({
      baseURL: "https://dummyjson.com/todos",
      timeout: 10000,
      signal,
    });
  }

  public async getAllTodos() {
    return await this.httpClient.get<PaginatedTodoResponse>("");
  }

  public async getTodoById(id: number) {
    return await this.httpClient.get<Todo>(`/${id}`);
  }

  public async getRamdomTodo() {
    return await this.httpClient.get<Todo>("/random");
  }

  public async getPaginatedTodos(limit: number, skip: number) {
    return await this.httpClient.get<PaginatedTodoResponse>(
      `?limit=${limit}&skip=${skip}`
    );
  }

  public async createTodo(todo: Todo) {
    return await this.httpClient.post<Todo, CreateTodoRequest>("/add", todo);
  }

  public async updateTodo(todo: Todo) {
    return await this.httpClient.put<Todo, UpdateTodoRequest>(
      `/${todo.id}`,
      todo
    );
  }

  public async deleteTodoById(id: number) {
    return await this.httpClient.delete<DeleteTodoResponse>(`/${id}`);
  }
}