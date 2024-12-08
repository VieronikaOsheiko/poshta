import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../Application/AuthContext";
import Login from "../features/auth/LoginPage";
import UserPage from "../features/users/UserPage";
import Register from "../features/auth/Register";
import CategoryPage from "../features/categoriess/CategoriesPage";
import ParcelPage from "../features/parcel/ParcelPage";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parcel"
            element={
              <ProtectedRoute>
                <ParcelPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
