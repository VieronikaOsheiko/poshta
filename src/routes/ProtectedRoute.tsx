import React, { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Application/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
