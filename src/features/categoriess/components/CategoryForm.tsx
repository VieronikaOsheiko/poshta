import React from "react";
import { CategoryDto } from "../../../Application/dto/CategoryDto";

interface CategoryFormProps {
  formData: Partial<CategoryDto>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ formData, onChange, onSaveEdit, onCancelEdit }) => {
  return (
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
  );
};

const styles: Record<string, React.CSSProperties> = {
  input: {
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
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
};

export default CategoryForm;
