import Navbar from "./Navbar";
import SendPost from "./SendPost";

const styles = {
  layout: {
    display: "flex",
    width: "auto",
    justifyContent: "center",
    minHeight: "100vh",
  },
  navbar: {
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  content: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "0px",
    backgroundColor: "#f0f0f0",
  },
};

function Layout({ children }) {
  return (
    <main style={styles.content}>
      <div style={styles.navbar}>
        <Navbar />
      </div>

      {children || <p>Sin contenido disponible</p>}

      {/* El modal debe ir SIEMPRE aquí */}
      <SendPost />
    </main>
  );
}

export default Layout;
