import { useEffect, useState } from 'react';


import { Todo, TodoService } from '../service/todo.service';

const TodoComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    const todoService = new TodoService(signal);

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await todoService.getAllTodos();
        if (isMounted) {
          setTodos(response.todos);
        }
      } catch (error) {
        if (isMounted) {
          setError((error as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTodos();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h1>Todo List</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>Id User</th>
          </tr>
        </thead>
        <tbody>
         {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.todo}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
              <td>{todo.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoComponent;
