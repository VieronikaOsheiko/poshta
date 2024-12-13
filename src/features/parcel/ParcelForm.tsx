import React from "react";
import { UserDto } from "../../Application/dto/UserDto";
import { CategoryDto } from "../../Application/dto/CategoryDto";
import { ParcelDto } from "../../Application/dto/ParcelDto";
import styles from "./styles";

interface ParcelFormProps {
  formData: Partial<ParcelDto>;
  users: UserDto[];
  categories: CategoryDto[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}


const ParcelForm: React.FC<ParcelFormProps> = ({
  formData,
  users,
  categories,
  onChange,
  onSave,
  onCancel,
}) => (
  <div>
    <h2>{formData.id ? "Редагування посилки" : "Створення нової посилки"}</h2>
    <input
      type="text"
      name="trackNumber"
      value={formData.trackNumber || ""}
      onChange={onChange}
      placeholder="Трек-номер"
      style={styles.input}
    />
    <input
      type="text"
      name="addresToCome"
      value={formData.addresToCome || ""}
      onChange={onChange}
      placeholder="Адреса доставки"
      style={styles.input}
    />
    <input
      type="text"
      name="weight"
      value={formData.weight || ""}
      onChange={onChange}
      placeholder="Вага"
      style={styles.input}
    />
    <select
      name="userId"
      value={formData.userId || ""}
      onChange={onChange}
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
      onChange={onChange}
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
      onChange={onChange}
      style={styles.input}
    >
      <option value="">Оберіть категорію</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
    <button onClick={onSave} style={styles.saveButton}>
      Зберегти
    </button>
    <button onClick={onCancel} style={styles.cancelButton}>
      Скасувати
    </button>
  </div>
);


export default ParcelForm;
