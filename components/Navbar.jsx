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
  
  return (
    
    <nav className="navbar">
    
    <div  className="navbar-links">
      {isLoggedIn ? (
        <>{/* REQUIERE AUTENTICACION */}
        <div className="navbar-item">
         
          <Link to={`/profile/${loggedUserId}`}>  <CgProfile className="navbar-icon"/></Link>
          <Link className="nav-link" to={`/profile/${loggedUserId}`}> Profile</Link>
        </div>
        <div className="navbar-item">
          
          <Link to={`/home/${loggedUserId}`}><IoHomeOutline className="navbar-icon"/></Link>
          <Link className="nav-link" to={`/home/${loggedUserId}`}>Home</Link>
        </div>
        <div className="navbar-item">
        <MdOutlinePostAdd      
        className="navbar-icon"
        onClick={() => showPopup('post')}
        />
           </div>
        </>
      ) : (
        <>{/* NO REQUIERE AUTENTICACION */}
          <Link className="nav-link" to="/home/:userId">Home</Link>
          <Link className="nav-link" to="/signup">Signup</Link>
          <Link className="nav-link" to="/login">Login</Link>
        </>
      )}
    </div>

    {/* REQUIERE AUTENTICACION Enlace LOGOUT */}
    {isLoggedIn && (
      <div className="navbar-logout">
        <Link className="nav-link" to={`/home/${loggedUserId}`} onClick={logoutUser}>
          Log out
        </Link>
      </div>
    )}
  </nav>
  
  );
}

export default Navbar;