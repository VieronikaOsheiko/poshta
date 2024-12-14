import React from 'react';
import { UserDto } from '../../../Application/dto/UserDto';

import { styles } from './styles';


interface UserFormProps {
  formData: Partial<UserDto>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ formData, onChange, onSave, onCancel }) => {
  return (
    <div>
      <h2>Редагування користувача</h2>
      <input
        type="text"
        name="firstName"
        value={formData.firstName || ""}
        onChange={onChange}
        placeholder="Ім'я"
      />
      <input
        type="text"
        name="lastname"
        value={formData.lastname || ""}
        onChange={onChange}
        placeholder="Прізвище"
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber || ""}
        onChange={onChange}
        placeholder="Номер телефону"
      />
      <input
        type="text"
        name="login"
        value={formData.login || ""}
        onChange={onChange}
        placeholder="Логін"
      />
      <input
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={onChange}
        placeholder="Пароль"
      />
      <button onClick={onSave} style={styles.editButton}>
        Зберегти
      </button>
      <button onClick={onCancel} style={styles.editButton}>
        Скасувати
      </button>
    </div>
  );
};

export default UserForm;
