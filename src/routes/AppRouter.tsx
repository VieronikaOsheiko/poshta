import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout.tsx";
import NotFoundPage from "../components/NotFoundPage.tsx";
import LoginPage from "../features/auth/LoginPage.tsx";
import HomePage from "../features/home/HomePage.tsx";
import TodoPage from "../features/todo/components/TodoPage.tsx";
import UsersPage from "../features/users/UserPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import BookReviewsPage from "../features/books/components/BookReviewsPage.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookReviewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;