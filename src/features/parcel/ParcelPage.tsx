import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParcelService from "../../Application/Service/ParcelService";  // імпорт ParcelService
import UserService from "../../Application/Service/UserService";
import CategoryService from "../../Application/Service/CategoryService";
import { ParcelDto } from "../../Application/dto/ParcelDto";
import { UserDto } from "../../Application/dto/UserDto";
import { CategoryDto } from "../../Application/dto/CategoryDto";

const ParcelPage: React.FC = () => {
  const [parcels, setParcels] = useState<ParcelDto[]>([]);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [formData, setFormData] = useState<Partial<ParcelDto>>({});
  const [editingParcelId, setEditingParcelId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const parcelService = new ParcelService();  // створення екземпляра ParcelService

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parcelData, userData, categoryData] = await Promise.all([
          parcelService.getAll(),  // виклик через екземпляр
          UserService.getAll(),
          CategoryService.getAll(),
        ]);
        setParcels(parcelData);
        setUsers(userData);
        setCategories(categoryData);
      } catch (err: any) {
        setError(err.message || "Сталася помилка при завантаженні даних.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (editingParcelId) {
        // Оновлення існуючої посилки
        await parcelService.update({ ...formData, id: editingParcelId } as ParcelDto);  // виклик через екземпляр
      } else {
        // Створення нової посилки
        await parcelService.create(formData as ParcelDto);  // виклик через екземпляр
      }
      setEditingParcelId(null);
      setFormData({});
      navigate(0); // Оновлення сторінки
    } catch (err: any) {
      setError(err.message || "Не вдалося зберегти дані.");
    }
  };

  const handleEditClick = (parcel: ParcelDto) => {
    setEditingParcelId(parcel.id || null);
    setFormData(parcel);
  };

  const handleDelete = async (parcelId: string) => {
    try {
      await parcelService.delete(parcelId);  // виклик через екземпляр
      setParcels(parcels.filter((parcel) => parcel.id !== parcelId));
    } catch (err: any) {
      setError(err.message || "Не вдалося видалити посилку.");
    }
  };

  return (
    <div style={styles.pageContent}>
      <h1 style={styles.pageTitle}>Посилки</h1>
      {error && <p style={styles.error}>{error}</p>}

      {editingParcelId || formData ? (
        <div>
          <h2>{editingParcelId ? "Редагування посилки" : "Створення нової посилки"}</h2>
          <input
            type="text"
            name="trackNumber"
            value={formData.trackNumber || ""}
            onChange={handleChange}
            placeholder="Трек-номер"
            style={styles.input}
          />
          <input
            type="text"
            name="addresToCome"
            value={formData.addresToCome || ""}
            onChange={handleChange}
            placeholder="Адреса доставки"
            style={styles.input}
          />
          <input
            type="text"
            name="weight"
            value={formData.weight || ""}
            onChange={handleChange}
            placeholder="Вага"
            style={styles.input}
          />
          <select
            name="userId"
            value={formData.userId || ""}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Оберіть користувача</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName}
              </option>
            ))}
          </select>
          <select
            name="receiverId"
            value={formData.receiverId || ""}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Оберіть отримувача</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName}
              </option>
            ))}
          </select>
          <select
            name="categoryId"
            value={formData.categoryId || ""}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Оберіть категорію</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={handleSave} style={styles.saveButton}>
            Зберегти
          </button>
          <button onClick={() => setEditingParcelId(null)} style={styles.cancelButton}>
            Скасувати
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setFormData({})} style={styles.createButton}>
            Додати посилку
          </button>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Трек-номер</th>
                <th>Адреса доставки</th>
                <th>Користувач</th>
                <th>Отримувач</th>
                <th>Категорія</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel.id}>
                  <td>{parcel.trackNumber}</td>
                  <td>{parcel.addresToCome}</td>
                  <td>{users.find((u) => u.id === parcel.userId)?.firstName}</td>
                  <td>{users.find((u) => u.id === parcel.receiverId)?.firstName}</td>
                  <td>{categories.find((c) => c.id === parcel.categoryId)?.name}</td>
                  <td>
                    <button onClick={() => handleEditClick(parcel)} style={styles.editButton}>
                      Редагувати
                    </button>
                    <button onClick={() => handleDelete(parcel.id!)} style={styles.deleteButton}>
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContent: { padding: "40px", width: "80%", margin: "0 auto" },
  pageTitle: { fontSize: "36px", marginBottom: "20px" },
  input: { margin: "10px 0", padding: "8px", width: "100%" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  saveButton: { backgroundColor: "green", color: "white", padding: "10px", margin: "5px" },
  cancelButton: { backgroundColor: "red", color: "white", padding: "10px", margin: "5px" },
  createButton: { backgroundColor: "blue", color: "white", padding: "10px", margin: "10px 0" },
  editButton: { backgroundColor: "orange", color: "white", padding: "5px 10px" },
  deleteButton: { backgroundColor: "red", color: "white", padding: "5px 10px" },
  error: { color: "red" },
};

export default ParcelPage;