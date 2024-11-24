import React, { useEffect, useState } from "react";
import UserService from "../../Application/Service/UserService";
import { UserDto } from "../../Application/dto/UserDto";

const UsersPage = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await UserService.getAll();

        // Мапінг для виправлення відповідності ключів
        const mappedUsers = allUsers.map((user: any) => ({
          ...user,
          firstname: user.firstName, // Переназиваємо firstName на firstname
          lastname: user.lastName, // Переназиваємо lastName на lastname
        }));

        setUsers(mappedUsers);
      } catch (err: any) {
        setError(err.message || "Сталася помилка під час завантаження користувачів.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={styles.pageContent}>
      <h1 style={styles.pageTitle}>Сторінка користувачів</h1>
      <p style={styles.pageSubtitle}>Ласкаво просимо на сторінку користувачів</p>

      {error && <p style={styles.error}>{error}</p>}

      <ul style={styles.userList}>
        {users.map((user) => (
          <li key={user.id} style={styles.userItem}>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Ім'я:</strong> {user.firstName}</p>
            <p><strong>Прізвище:</strong> {user.lastname}</p>
            <p><strong>Номер телефону:</strong> {user.phoneNumber}</p>
            <p><strong>Логін:</strong> {user.login}</p>
            <p><strong>Пароль:</strong> {user.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContent: {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexGrow: 1,
    padding: "40px",
    width: "80%",
  },
  pageTitle: {
    color: "#2d6934",
    fontSize: "46px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  pageSubtitle: {
    color: "#666666",
    fontSize: "18px",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "16px",
    marginBottom: "20px",
  },
  userList: {
    listStyleType: "none",
    padding: 0,
  },
  userItem: {
    backgroundColor: "#030202",
    margin: "10px 0",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Додаємо тінь
  },
};

export default UsersPage;
