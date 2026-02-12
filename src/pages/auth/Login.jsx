import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensajes de error
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const userKey = {
      email: formData.email,
      password: formData.password,
    }
    try {
      const response = await service.post("/auth/login", userKey)
      const {authToken} = response.data
      console.log("Login exitoso 🚀")
      localStorage.setItem("authToken", authToken)
      authenticateUser()
      navigate(`/home`); // Redirige al dashboard si el login es exitoso
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errorMessage) {
        setErrorMessage(e.response.data.errorMessage); // Mostrar mensaje del servidor
      } else {
        setErrorMessage("Algo salió mal. Inténtalo de nuevo."); // Mensaje genérico
      }
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        {errorMessage && ( // Mostrar mensaje de error si existe
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Iniciar Sesión
        </button>
        ¿not a member yet? <a href="/signup">Sign Up</a>
      </form>
    </div>
  );
}

export default Login;