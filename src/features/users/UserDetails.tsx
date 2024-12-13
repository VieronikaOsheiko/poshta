import React from 'react';
import { UserDto } from '../../Application/dto/UserDto';
import { styles } from './styles';

interface UserDetailsProps {
  user: UserDto;
  onEdit: (user: UserDto) => void;
  onDelete: (userId: string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Ім'я:</strong> {user.firstName}</p>
      <p><strong>Прізвище:</strong> {user.lastname}</p>
      <p><strong>Номер телефону:</strong> {user.phoneNumber}</p>
      <p><strong>Логін:</strong> {user.login}</p>
      <p><strong>Пароль:</strong> {user.password}</p>

      <div style={styles.buttons}>
        <button onClick={() => onEdit(user)} style={styles.editButton}>
          Редагувати
        </button>
        <button onClick={() => onDelete(user.id!)} style={styles.deleteButton}>
          Видалити
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
