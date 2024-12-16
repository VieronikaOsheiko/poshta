import React from "react";
import { ParcelDto } from "../../../Application/dto/ParcelDto";
import { UserDto } from "../../../Application/dto/UserDto";
import { CategoryDto } from "../../../Application/dto/CategoryDto";
import styles from "./styles";

interface ParcelListProps {
  parcels: ParcelDto[];
  users: UserDto[];
  categories: CategoryDto[];
  onEditClick: (parcel: ParcelDto) => void;
  onDelete: (parcelId: string) => void;
}

const ParcelList: React.FC<ParcelListProps> = ({
  parcels,
  users,
  categories,
  onEditClick,
  onDelete,
}) => (
  <div>
    <button onClick={() => onEditClick({} as ParcelDto)} style={styles.createButton}>
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
              <button onClick={() => onEditClick(parcel)} style={styles.editButton}>
                Редагувати
              </button>
              <button onClick={() => onDelete(parcel.id!)} style={styles.deleteButton}>
                Видалити
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ParcelList;
