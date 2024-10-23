import { useEffect, useState } from 'react';
import { Todo, TodoService } from '../service/todo.service';

const TodoComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const todoService = new TodoService();

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await todoService.fetchAllTodos();
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
          </tr>
        </thead>
        <tbody>
          {todos.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.todo}</td>
              <td>{t.completed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoComponent;
