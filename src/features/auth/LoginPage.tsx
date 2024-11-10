import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    userName: "admin",
    password: "admin",
    role: "admin",
  },
  {
    userName: "user",
    password: "user",
    role: "user",
  },
];

const LoginPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserName(event.target.value);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = users.find((user) => user.userName === userName);

    if (!user) {
      alert("User does not exist");
      return;
    }

    if (user.password !== password) {
      alert("Invalid password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "admin") {
      navigate("/users");
      return;
    }

    if (user.role === "user") {
      navigate("/");
      return;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>LOGIN</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={handleUserNameInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordInputChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    width: "600px",
backgroundImage: 'linear-gradient(to bottom right, #6c757d, #2d6934)',
  },
  loginBox: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    padding: "2em",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
  },
  title: {
    margin: "0 0 1.5em",
    color: "#2d6934",
    fontSize: "1.5em",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: "1em",
  },
  input: {
    width: "100%",
    padding: "0.5em",
    fontSize: "1em",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100px",
    padding: "0.7em",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#2d6934",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};


export default LoginPage;
