const HomePage = () => {
  return (
    <div style={styles.pageContent}>
      <h1 style={styles.pageTitle}>Home Page</h1>
      <p style={styles.pageSubtitle}>Welcome to the home page</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContent: {
    
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexGrow: 1,
    padding: "40px",
  },
  pageTitle: {
    color: "#2d6934",
    fontSize: "46px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  pageSubtitle: {
    color: "#666666",
    fontSize: "18px",
  },
};

export default HomePage;
