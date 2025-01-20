import { Link } from "react-router-dom";
import { useContext } from "react";
import { usePopup } from "../context/popUp.context.jsx";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { showPopup } = usePopup();
  const { authenticateUser, isLoggedIn, logoutUser, loggedUserId } = useContext(AuthContext)
  const styles = {
    navbar: {
      position: "fixed",
      top: "0",
      left: "0",
      height: "100vh",  // Hace que ocupe toda la altura de la pantalla
      width: "200px",   // Define el ancho del navbar
      backgroundColor: "#f8f9fa",
      boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",  // Alinea los elementos en columna
      justifyContent: "flex-start",
      paddingTop: "20px",  // Espacio desde la parte superior
    },
    navLink: {
      padding: "10px 20px", 
      textDecoration: "none", 
      color: "black",
      textAlign: "center",
    },
    logoutLink: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      width: "auto",
    },
  };
  return (
    <nav style={styles.navbar}>
    
    <div className="d-flex flex-column">
      {isLoggedIn ? (
        <>{/* REQUIERE AUTENTICACION */}
          <Link style={styles.navLink} to={`/profile/${loggedUserId}`}>Profile</Link>
          <Link style={styles.navLink} to="/">Home</Link>
          <button onClick={() => showPopup('post')} style={styles.navLink}>Post</button>
        </>
      ) : (
        <>{/* NO REQUIERE AUTENTICACION */}
          <Link style={styles.navLink} to="/">Home</Link>
          <Link style={styles.navLink} to="/signup">Signup</Link>
          <Link style={styles.navLink} to="/login">Login</Link>
        </>
      )}
    </div>

    {/* REQUIERE AUTENTICACION Enlace LOGOUT */}
    {isLoggedIn && (
      <div style={styles.logoutLink}>
        <Link style={styles.navLink} to="/" onClick={logoutUser}>
          Log out
        </Link>
      </div>
    )}
  </nav>
  );
}

export default Navbar;