import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Application/AuthContext";  // Ensure this is imported correctly
import Login from "../features/auth/LoginPage";  // Your Login page component
import UserPage from "../features/users/UserPage";  // Example of another page that requires authentication

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserPage />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
