import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Application/Service/UserService";
import { UserDto } from "../../Application/dto/UserDto";

const UsersPage = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UserDto>>({});
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const currentUser = await UserService.getById();
          setUser(currentUser);
        }
      } catch (err: any) {
        setError(err.message || "Сталася помилка під час завантаження користувача.");
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = (user: UserDto) => {
    setEditingUserId(user.id ?? null);
    setFormData({
      firstName: user.firstName,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      login: user.login,
      password: user.password,
    });
  };

  const handleSaveEdit = async () => {
    if (formData && editingUserId) {
      try {
        const updatedUser = await UserService.update(formData as UserDto);
        setUser(updatedUser);
        setEditingUserId(null);
        setFormData({});
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Не вдалося зберегти зміни.");
        } else {
          setError("Не вдалося зберегти зміни.");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (userId: string) => {
    if (userId) {
      try {
        await UserService.delete(userId);
        setUser(null);
        console.log("Перенаправлення на реєстрацію...");
        navigate("/register");
      } catch (err: any) {
        setError(err.message || "Не вдалося видалити користувача.");
      }
    }
  };

  const handleCategoryClick = () => {
    navigate("/category");
  };

  const handleSendParcelClick = () => {
    navigate("/parcel");
  };

  return (
    <div style={styles.pageContent}>
      <h1 style={styles.pageTitle}>Дані користувача</h1>
      {error && <p style={styles.error}>{error}</p>}

      {user ? (
        <div>
          {editingUserId ? (
            <div>
              <h2>Редагування користувача</h2>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                placeholder="Ім'я"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname || ""}
                onChange={handleChange}
                placeholder="Прізвище"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                placeholder="Номер телефону"
              />
              <input
                type="text"
                name="login"
                value={formData.login || ""}
                onChange={handleChange}
                placeholder="Логін"
              />
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="Пароль"
              />
              <button onClick={handleSaveEdit} style={styles.editButton}>
                Зберегти
              </button>
              <button onClick={() => setEditingUserId(null)} style={styles.editButton}>
                Скасувати
              </button>
            </div>
          ) : (
            <div>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Ім'я:</strong> {user.firstName}</p>
              <p><strong>Прізвище:</strong> {user.lastname}</p>
              <p><strong>Номер телефону:</strong> {user.phoneNumber}</p>
              <p><strong>Логін:</strong> {user.login}</p>
              <p><strong>Пароль:</strong> {user.password}</p>

              <div style={styles.buttons}>
                <button onClick={() => handleEditClick(user)} style={styles.editButton}>
                  Редагувати
                </button>
                <button onClick={() => handleDelete(user.id!)} style={styles.deleteButton}>
                  Видалити
                </button>
              </div>
            </div>
          )}

          <div>
            <button onClick={handleCategoryClick} style={styles.categoryButton}>
              Категорія
            </button>
            <button onClick={handleSendParcelClick} style={styles.sendParcelButton}>
              Відправити посилку
            </button>
          </div>
        </div>
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContent: {
    padding: "40px",
    width: "80%",
    margin: "0 auto",
  },
  pageTitle: {
    color: "#2d6934",
    fontSize: "46px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  error: {
    color: "red",
    fontSize: "16px",
    marginBottom: "20px",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  buttons: {
    marginTop: "20px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  categoryButton: {
    backgroundColor: "yellow",
    color: "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  sendParcelButton: {
    backgroundColor: "#800080",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default UsersPage;
