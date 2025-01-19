import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { authenticateUser, isLoggedIn, logoutUser } = useContext(AuthContext)
  return (
    <nav className="container d-flex justify-content-between align-items-center">
    
    <div className="d-flex mx-auto">
      {isLoggedIn ? (
        <>{/* REQUIERE AUTENTICACION */}
          <Link className="nav-link px-3" to="/profile">Profile</Link>
          <Link className="nav-link px-3" to="/">Home</Link>
          <button>Post</button>
        </>
      ) : (
        <>{/* NO REQUIERE AUTENTICACION */}
          <Link className="nav-link px-3" to="/">Home</Link>
          <Link className="nav-link px-3" to="/signup">Signup</Link>
          <Link className="nav-link px-3" to="/login">Login</Link>
        </>
      )}
    </div>

    {/* REQUIERE AUTENTICACION Enlace LOGOUT */}
    {isLoggedIn && (
      <div className="logout-link">
        <Link className="nav-link px-3" to="/" onClick={logoutUser}>
          Log out
        </Link>
      </div>
    )}
  </nav>
  );
}

export default Navbar;