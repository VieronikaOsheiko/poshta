// src/routes/ProtectedRoute.tsx
import React, { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  AuthService  from "../Application/AuthService";  // Іменований імпорт

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
