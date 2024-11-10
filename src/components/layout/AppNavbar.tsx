import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userJson = localStorage.getItem("user");

  let user;

  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error(error);
  }

  return (
     <div style={styles.gradientOverlay}>
    <div style={styles.container}>
      <nav style={styles.nav}>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <h1 style={styles.cactus}>CactusDelivery</h1>
             <img  src="https://florina.kh.ua/image/cache/catalog/kategorii/komnatnye-rasteniya/dekorativno-listvennye-rasteniya/kaktus-vladius-1-555x555.jpg" alt="Cactus" style={styles.image} />
            </li>
          <li style={styles.li}>
            <button onClick={handleLogout} style={{ ...styles.linkButton, ...styles.logoutButton }}>
              Logout
            </button>
          </li>
          <li style={styles.li}>
            <Link to="/" style={styles.link}>
              Home
            </Link>
          </li>
          <li style={styles.li}>
            <Link to="/todo" style={styles.link}>
              ToDo
            </Link>
          </li>
          {user?.role === "admin" && (
            <li style={styles.li}>
              <Link to="/users" style={styles.link}>
                User
              </Link>
            </li>
          )}
          <li style={styles.li}>
            <Link to="/books" style={styles.link}>
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
      </div>
      </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
  },
  nav: {
    position: "fixed", // Для фіксованого положення
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Розподілить елементи рівномірно з відступами зверху та знизу
    backgroundImage: 'linear-gradient(to bottom right, #6c757d, #2d6934)',
    padding: "10px", // Відступи всередині
    width: "300px",
    height: "100vh",
    boxSizing: "border-box",
    borderRight: "1px solid #cccccc",
  },
   cactus: {
    textAlign: "center",  // Центрує текст по горизонталі
     fontSize: "32px",
  },
  image: {
    width: "80px",
    height: "80px",
    display: "block",
    margin: "0 auto",
  },
  ul: {
    listStyle: "none",
    width: "calc(100% - 20px)", // Розтягнути елемент по ширині з відступами
    padding: "10px", // Відступи з боків
    boxSizing: "border-box",
  },
  li: {
    margin: "10px 0",
    width: "100%",
  },
  link: {
    display: "block",
    width: "100%",
    padding: "10px",
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#67846A",
    borderRadius: "5px",
    fontSize: "20px",
    fontWeight: "bold",
  },

  
  linkButton: {
    display: "block",
    left: "0px",
    width: "108%",
    padding: "10px",
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#6c757d",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: "#2d6934",
  },


  gradientOverlay: {/*
   position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(to bottom right, #6c757d, #2d6934)',
    opacity: 0.6, // Прозорість для градієнта*/
  },



};

export default AppNavbar;
