import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Application/Service/UserService";
import { UserDto } from "../../Application/dto/UserDto";
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import { styles } from './styles';
import LoadingPage from "../loading/LoadingPage"; 

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
        setError(error instanceof Error ? error.message : "Не вдалося зберегти зміни.");
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

      {user === null ? (
        <LoadingPage />
      ) : (
        <div>
          {editingUserId ? (
            <UserForm
              formData={formData}
              onChange={handleChange}
              onSave={handleSaveEdit}
              onCancel={() => setEditingUserId(null)}
            />
          ) : (
            <UserDetails user={user} onEdit={handleEditClick} onDelete={handleDelete} />
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
      )}
    </div>
  );
};

export default UsersPage;
