import Navbar from "./Navbar";
import SendPost from "./SendPost";

const styles = {
  navbar: {
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

function Layout({ children }) {
  return (
    <main className="app-layout">
      <div className="layout-navbar" style={styles.navbar}>
        <Navbar />
      </div>

      <section className="layout-content">
        {children || <p>Sin contenido disponible</p>}
      </section>

      <SendPost />
    </main>
  );
}

export default Layout;
