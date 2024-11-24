import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Application/Service/AuthContext";
import Login from "./features/auth/LoginPage";
import UserPage from "./features/users/UserPage";
import Register from "./features/auth/Register";  // Ваш компонент входу

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
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
