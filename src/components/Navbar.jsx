import { Link } from "react-router-dom";
import { useContext } from "react";
import { usePopup } from "../context/popUp.context.jsx";
import { AuthContext } from "../context/auth.context";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";

function Navbar() {
  const { showPopup } = usePopup();
  const { authenticateUser, isLoggedIn, logoutUser, loggedUserId } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <div className="navbar-item home-button">
              <Link to={`/home`}>
                <IoHomeOutline className="navbar-icon" />
              </Link>
              <Link className="nav-link" to={`/`}>Home</Link>
            </div>
            
            {/* Requiere autenticación */}
            <div className="navbar-item profile-button">
              <Link to={`/profile/${loggedUserId}`}>
                <CgProfile className="navbar-icon" />
              </Link>
              <Link className="nav-link" to={`/profile/${loggedUserId}`}>Profile</Link>
            </div>

            <div className="navbar-item post-button">
              <MdOutlinePostAdd
                className="navbar-icon"
                onClick={() => showPopup('post')}
              />
            </div>
           
            
          </>
        ) : (
          <>
            {/* No requiere autenticación */}
            <Link to="/home" className="navbar-item">
              <IoHomeOutline className="navbar-icon" />
            </Link>
            <Link to="/" className="navbar-item">
            <AiOutlineUser className="navbar-icon" />
            </Link>
           
          </>
        )}
      </div>

      {/* Solo muestra el logout si el usuario está autenticado */}
      {isLoggedIn && (
        <div className="navbar-logout" >
          <a href="/" onClick={logoutUser}>
            <TbLogout2 className="navbar-icon" />
          </a>
          
        </div>
      )}
    </nav>
  );
}

export default Navbar;