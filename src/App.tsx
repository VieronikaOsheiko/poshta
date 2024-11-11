import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Application/AuthContext";
import Login from "./features/auth/LoginPage"; // Ваш компонент входу

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Додайте інші маршрути */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
