import React, { useEffect, useState } from "react";
import CategoryService from "../../Application/Service/CategoryService";
import { CategoryDto } from "../../Application/dto/CategoryDto";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CategoryDto>>({});
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await CategoryService.getAll();
        setCategories(categories); 
      } catch (err: any) {
        setError(err.message || "Сталася помилка під час завантаження категорій.");
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category: CategoryDto) => {
    setEditingCategoryId(category.id ?? null);
    setFormData({
      name: category.name,
      material: category.material,
      size: category.size,
      inCountry: category.inCountry,
    });
  };

  const handleSaveEdit = async () => {
    if (formData && editingCategoryId) {
      try {
        const updatedCategory = await CategoryService.update(formData as CategoryDto);
        setCategories((prev) =>
          prev.map((cat) => (cat.id === editingCategoryId ? updatedCategory : cat))
        );
        setEditingCategoryId(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (categoryId) {
      try {
        await CategoryService.delete(categoryId);
        setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
      } catch (err: any) {
        setError(err.message || "Не вдалося видалити категорію.");
      }
    }
  };

  return (
    <div style={styles.pageContent}>
      <h1 style={styles.pageTitle}>Категорії</h1>
      {error && <p style={styles.error}>{error}</p>}

      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id} style={styles.listItem}>
              {editingCategoryId === category.id ? (
                <div>
                  <h2>Редагування категорії</h2>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Назва"
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="material"
                    value={formData.material || ""}
                    onChange={handleChange}
                    placeholder="Матеріал"
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="size"
                    value={formData.size || ""}
                    onChange={handleChange}
                    placeholder="Розмір"
                    style={styles.input}
                  />
                  <label>
                    <input
                      type="checkbox"
                      name="inCountry"
                      checked={formData.inCountry || false}
                      onChange={handleChange}
                    />
                    В країні
                  </label>
                  <button onClick={handleSaveEdit} style={styles.editButton}>
                    Зберегти
                  </button>
                  <button onClick={() => setEditingCategoryId(null)} style={styles.editButton}>
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
                    <button onClick={() => handleEditClick(category)} style={styles.editButton}>
                      Редагувати
                    </button>
                    <button onClick={() => handleDelete(category.id!)} style={styles.deleteButton}>
                      Видалити
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Категорій поки немає</p>
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

export default CategoryPage;
