import { HttpClient } from "../../../utils/Http/HttpClient";

interface PaginatedResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface Todo {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
}

type CreateTodo = Omit<Todo, "id">;

interface PaginatedTodoResponse extends PaginatedResponse {
  todos: Todo[];
}

export class TodoService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({
      baseURL: "https://dummyjson.com/todos",
    });
  }

  public async fetchAllTodos() {
    return this.httpClient.get<PaginatedTodoResponse>("/");
  }

  public async fetchTodoById(id: number) {
    return this.httpClient.get<Todo>(`/${id}`);
  }

  public async getRandomTodo() {
    return this.httpClient.get<Todo>("/random");
  }

  public async getPaginatedTodos(skip: number, limit: number) {
    return this.httpClient.get<PaginatedTodoResponse>(`?skip=${skip}&limit=${limit}`);
  }

  public async createTodo(todo: CreateTodo) {
    return this.httpClient.post<CreateTodo>("add", todo);
    }
    

    public async updateTodoById(id: number, todo: Todo) {
    return this.httpClient.put<Todo>(`/${id}`, todo);
    }
  
     public async deleteTodoById(id: number) {
    return this.httpClient.delete<Todo>(`/${id}`);
  }
}
