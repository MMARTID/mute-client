import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userKey = {
      email,
      password,
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        userKey
      );
      navigate("/profile"); // Redirige al dashboard si el login es exitoso
    } catch (e) {
      console.log(e.response, "Error en la solicitud");
      navigate("/error"); // Redirige a una página de error si algo falla
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-0">
          <label htmlFor="email" className="form-label">
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            className="form-control"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div >
          <label htmlFor="password" className="form-label">
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;