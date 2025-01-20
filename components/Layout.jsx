import Navbar from "./Navbar";

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  navbar: {
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px 0",
  },
  content: {
    flex: "1", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f0f0"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "20px",
    width: "100%",
    maxWidth: "800px"
  },
  footer: {
    backgroundColor: "#343a40", 
    color: "#ffffff", 
    textAlign: "center",
    padding: "10px 0"
  }
};

function Layout({ children }) {
  
  return (
    <div style={styles.layout}>
      <header style={styles.navbar}>
        <Navbar />
      </header>

      {/* Contenido principal */}
      <main style={styles.content}>
        <div style={styles.container}>
          {children || <p>Sin contenido disponible</p>}
        </div>
      </main>

      
    </div>
  );
}

export default Layout;
