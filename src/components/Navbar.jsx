import { Link } from "react-router-dom";
import { useContext } from "react";
import { usePopup } from "../context/popUp.context.jsx";
import { AuthContext } from "../context/auth.context";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";

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
                <IoHomeOutline className="navbar-icon" /> <span className="icon-text">Home</span>
              </Link>
              
            </div>
            
            {/* Requiere autenticación */}
            <div className="navbar-item profile-button">
              <Link to={`/profile/${loggedUserId}`}>
                <CgProfile className="navbar-icon" /> <span className="icon-text">Profile</span>
              </Link>
            </div>
            <div className="navbar-item saved-posts-button">
              <Link to={`/savedposts/${loggedUserId}`}>
                <FaBookmark className="navbar-icon" /> <span className="icon-text">Saved</span>
              </Link>
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
        <>
        <div className="navbar-logout" style={{display: "none"}}>
          <a href="/" onClick={logoutUser}>
            <TbLogout2 className="navbar-icon" />
          </a>
        </div>
        <div className="navbar-post" onClick={() => showPopup('post')}>
            <MdOutlinePostAdd
              className="navbar-icon"
              />
          </div></>



        
      )}
    </nav>
  );
}

export default Navbar;