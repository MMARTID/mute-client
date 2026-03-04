import Navbar from "./Navbar";
import SendPost from "./SendPost";
import SideBar from "./SideBar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const styles = {
  navbar: {
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

function Layout({ children }) {
    const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  return (
    <main className="app-layout">
      <div className="layout-navbar" style={styles.navbar}>
        <Navbar />
      </div>

      <section className="layout-content">
        {children || <p>Sin contenido disponible</p>}
      </section>

      <SendPost />
      {isLoggedIn ? <SideBar /> : null}
    </main>
  );
}

export default Layout;
