import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { Todo, TodoService } from '../service/todo.service';

const TodoPage = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const todoService = new TodoService(signal);

    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);

        const todos = await todoService.getAllTodos();

        if (isMounted) {
          setTodo(todos.todos);
        }
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();

    return () => {
      isMounted = false;
      abortController.abort();
    }
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <h1 style={styles.pageTitle}>Todos List</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>User Id</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((todo) => (
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
  )
}



const styles: Record<string, React.CSSProperties> = {

  pageTitle: {
    color: "#2d6934",
    fontSize: "46px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};


export default TodoPage