import React, { useEffect, useState } from "react";
import CategoryService from "../../Application/Service/CategoryService";
import { CategoryDto } from "../../Application/dto/CategoryDto";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import LoadingPage from "../loading/LoadingPage";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CategoryDto>>({});
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await CategoryService.getAll();
        setCategories(categories);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Сталася помилка під час завантаження категорій.");
        setLoading(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={styles.pageContent}>
      <h1 style={styles.pageTitle}>Категорії</h1>
      {error && <p style={styles.error}>{error}</p>}


      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {editingCategoryId ? (
            <CategoryForm
              formData={formData}
              onChange={handleChange}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={() => setEditingCategoryId(null)}
            />
          ) : (
            <CategoryList
              categories={categories}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
              isEditing={editingCategoryId}
              formData={formData}
              onChange={handleChange}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={() => setEditingCategoryId(null)}
            />
          )}
        </>
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
};

export default CategoryPage;
