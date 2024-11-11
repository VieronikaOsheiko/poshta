import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Application/AuthContext"; // Імпортуємо хук

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Отримуємо функцію login з контексту

  const handleLogin = async () => {
    try {
      const success = await authLogin(login, password); // Викликаємо login
      if (success) {
        navigate("/users");
      } else {
        setError("Не вдалося увійти. Перевірте логін або пароль.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Сталася помилка під час входу.");
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="text"
            placeholder="Логін"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Увійти</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="message">
            Ще не зареєстровані? <a href="/register">Створити акаунт</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
