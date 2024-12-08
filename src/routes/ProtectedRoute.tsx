import React, { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Application/AuthContext"; // Використовуємо хук useAuth

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Отримуємо статус авторизації з контексту
  const navigate = useNavigate();

  // Якщо користувач не авторизований, перенаправляємо його на /login
  if (!isAuthenticated) {
    navigate("/login");
    return null; // Повертаємо нічого, щоб не рендерити контент
  }

  // Якщо авторизований, повертаємо дочірні елементи
  return <>{children}</>;
};

export default ProtectedRoute;
