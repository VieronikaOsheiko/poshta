import React from "react";
import { CategoryDto } from "../../Application/dto/CategoryDto";

interface CategoryItemProps {
  category: CategoryDto;
  onEditClick: (category: CategoryDto) => void;
  onDelete: (categoryId: string) => void;
  isEditing: boolean;
  formData: Partial<CategoryDto>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onEditClick,
  onDelete,
  isEditing,
  formData,
  onChange,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <li style={styles.listItem}>
      {isEditing ? (
        <div>
          <h2>Редагування категорії</h2>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={onChange}
            placeholder="Назва"
            style={styles.input}
          />
          <input
            type="text"
            name="material"
            value={formData.material || ""}
            onChange={onChange}
            placeholder="Матеріал"
            style={styles.input}
          />
          <input
            type="text"
            name="size"
            value={formData.size || ""}
            onChange={onChange}
            placeholder="Розмір"
            style={styles.input}
          />
          <label>
            <input
              type="checkbox"
              name="inCountry"
              checked={formData.inCountry || false}
              onChange={onChange}
            />
            В країні
          </label>
          <button onClick={onSaveEdit} style={styles.editButton}>
            Зберегти
          </button>
          <button onClick={onCancelEdit} style={styles.editButton}>
            Скасувати
          </button>
        </div>
      ) : (
        <div>
          <p><strong>ID:</strong> {category.id}</p>
          <p><strong>Назва:</strong> {category.name}</p>
          <p><strong>Матеріал:</strong> {category.material}</p>
          <p><strong>Розмір:</strong> {category.size}</p>
          <p><strong>В країні:</strong> {category.inCountry ? "Так" : "Ні"}</p>
          <div style={styles.buttons}>
            <button onClick={() => onEditClick(category)} style={styles.editButton}>
              Редагувати
            </button>
            <button onClick={() => onDelete(category.id!)} style={styles.deleteButton}>
              Видалити
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

const styles: Record<string, React.CSSProperties> = {
  listItem: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
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
};

export default CategoryItem;
