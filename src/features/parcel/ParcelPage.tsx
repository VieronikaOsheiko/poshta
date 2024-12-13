import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParcelService from "../../Application/Service/ParcelService";
import UserService from "../../Application/Service/UserService";
import CategoryService from "../../Application/Service/CategoryService";
import { ParcelDto } from "../../Application/dto/ParcelDto";
import { UserDto } from "../../Application/dto/UserDto";
import { CategoryDto } from "../../Application/dto/CategoryDto";
import ParcelForm from "./ParcelForm";
import ParcelList from "./ParcelList";
import styles from "./styles";
import LoadingPage from "../loading/LoadingPage";

const ParcelPage: React.FC = () => {
  const [parcels, setParcels] = useState<ParcelDto[]>([]);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [formData, setFormData] = useState<Partial<ParcelDto>>({});
  const [editingParcelId, setEditingParcelId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const parcelService = new ParcelService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parcelData, userData, categoryData] = await Promise.all([
          parcelService.getAll(),
          UserService.getAll(),
          CategoryService.getAll(),
        ]);
        setParcels(parcelData);
        setUsers(userData);
        setCategories(categoryData);
        setLoading(false); 
      } catch (err: any) {
        setError(err.message || "Сталася помилка при завантаженні даних.");
        setLoading(false); 
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
        await parcelService.update({ ...formData, id: editingParcelId } as ParcelDto);
      } else {
        await parcelService.create(formData as ParcelDto);
      }
      setEditingParcelId(null); 
      setFormData({}); 
      navigate(0); 
    } catch (err: any) {
      setError(err.message || "Не вдалося зберегти дані.");
    }
  };

  const handleCancel = () => {
    setEditingParcelId(null); 
    setFormData({}); 
  };

  const handleEditClick = (parcel: ParcelDto) => {
    setEditingParcelId(parcel.id || null);
    setFormData(parcel);
  };

  const handleDelete = async (parcelId: string) => {
    try {
      await parcelService.delete(parcelId);
      setParcels(parcels.filter((parcel) => parcel.id !== parcelId));
    } catch (err: any) {
      setError(err.message || "Не вдалося видалити посилку.");
    }
  };

  return (
    <div style={styles.pageContent}>
      <h1 style={styles.pageTitle}>Посилки</h1>
      {error && <p style={styles.error}>{error}</p>}

      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {editingParcelId || formData ? (
            <ParcelForm
              formData={formData}
              users={users}
              categories={categories}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ParcelList
              parcels={parcels}
              users={users}
              categories={categories}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ParcelPage;
