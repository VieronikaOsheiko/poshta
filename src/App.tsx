import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./Application/Service/AuthContext";
import Login from "./features/auth/LoginPage";
import UserPage from "./features/users/UserPage";
import Register from "./features/auth/Register";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Редирект з головної сторінки на сторінку логіну */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/register" element={<Register />} />
          {/* Додайте інші маршрути */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
