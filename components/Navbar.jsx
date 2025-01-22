import { Link } from "react-router-dom";
import { useContext } from "react";
import { usePopup } from "../context/popUp.context.jsx";
import { AuthContext } from "../context/auth.context";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";

function Navbar() {
  const { showPopup } = usePopup();
  const { authenticateUser, isLoggedIn, logoutUser, loggedUserId } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            {/* Requiere autenticación */}
            <div className="navbar-item">
              <Link to={`/profile/${loggedUserId}`}>
                <CgProfile className="navbar-icon" />
              </Link>
              <Link className="nav-link" to={`/profile/${loggedUserId}`}>Profile</Link>
            </div>

            <div className="navbar-item">
              <Link to={`/`}>
                <IoHomeOutline className="navbar-icon" />
              </Link>
              <Link className="nav-link" to={`/`}>Home</Link>
            </div>

            <div className="navbar-item">
              <MdOutlinePostAdd
                className="navbar-icon"
                onClick={() => showPopup('post')}
              />
            </div>
            <div>
              <button onClick={logoutUser}>
                
              </button>
            </div>
          </>
        ) : (
          <>
            {/* No requiere autenticación */}
            <Link to="/" className="navbar-item">
              <IoHomeOutline className="navbar-icon" />
            </Link>
            <Link to="/signup" className="navbar-item">Signup</Link>
            <Link to="/login" className="navbar-item">Login</Link>
          </>
        )}
      </div>

      {/* Solo muestra el logout si el usuario está autenticado */}
      {isLoggedIn && (
        <div className="navbar-logout">
          <Link className="nav-link" to={`/`} onClick={logoutUser}>
            <TbLogout2 className="navbar-icon" />
            Log out
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;