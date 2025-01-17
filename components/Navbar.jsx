import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo o marca */}
        <Link className="navbar-brand" to="/"></Link>

        {/* Enlaces de navegación en fila */}
        <div className="d-flex">
          <Link className="nav-link px-3" to="/">Home</Link>
          <Link className="nav-link px-3" to="/signup">Signup</Link>
          <Link className="nav-link px-3" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;