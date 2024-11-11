// src/routes/AppRouter.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../features/auth/LoginPage"; // Імпорт компонента для логіну
import HomePage from "../features/home/HomePage";
import TodoPage from "../features/todo/components/TodoPage";
import UsersPage from "../features/users/UserPage";
import ProtectedRoute from "./ProtectedRoute";
import BookReviewsPage from "../features/books/components/BookReviewsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Маршрут для сторінки логіну */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Захищені маршрути, доступні після авторизації */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="books" element={<BookReviewsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
        
        {/* Сторінка 404 для невідомих маршрутів */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
