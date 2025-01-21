import { Link } from "react-router-dom";
import { useContext } from "react";
import { usePopup } from "../context/popUp.context.jsx";
import { AuthContext } from "../context/auth.context";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
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
    
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {isLoggedIn ? (
        <>{/* REQUIERE AUTENTICACION */}
        <div style={{display: 'flex', alignContent: 'center', justifyContent: 'space-evently', alignItems: 'center'}}>
          <CgProfile />
          <Link style={styles.navLink} to={`/profile/${loggedUserId}`}> Profile</Link>
        </div>
        <div style={{display: 'flex', alignContent: 'center', justifyContent: 'space-evently', alignItems: 'center'}}>
          <IoHomeOutline />
          <Link style={styles.navLink} to={`/home/${loggedUserId}`}>Home</Link>
        </div>
        <MdOutlinePostAdd 
        size="" 
        style={{width: '50px', alignItems: 'center'}}
        onClick={() => showPopup('post')}
        />
        </>
      ) : (
        <>{/* NO REQUIERE AUTENTICACION */}
          <Link style={styles.navLink} to="/home/:userId">Home</Link>
          <Link style={styles.navLink} to="/signup">Signup</Link>
          <Link style={styles.navLink} to="/login">Login</Link>
        </>
      )}
    </div>

    {/* REQUIERE AUTENTICACION Enlace LOGOUT */}
    {isLoggedIn && (
      <div style={styles.logoutLink}>
        <Link style={styles.navLink} to={`/home/${loggedUserId}`} onClick={logoutUser}>
          Log out
        </Link>
      </div>
    )}
  </nav>
  );
}

export default Navbar;