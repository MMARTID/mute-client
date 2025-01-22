import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, username, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    const userKey = {
      email,
      username,
      password,
    };
    console.log(userKey);

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        userKey
      );
      navigate("/login");
    } catch (e) {
      console.log(e.response, "Error en la solicitud");
      if (e.response?.request?.status === 400) {
        setErrorMessage(e.response.errorMessage);
      }
      console.log(e);
      navigate("/error"); // Redirige a una página de error si algo falla
    }
  };
  return (
    <>
      <div className="container mt-5">
      <h1 className="text-center mb-4">Formulario de Registro</h1>

      <form onSubmit={handleSubmit} className="w-50 mx-auto my-auto">
        <div>
          <label htmlFor="email" className="form-label">
            
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Correo Electrónico"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="my-0 ">
          <label htmlFor="username" className="form-label">
            
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Nombre de Usuario"
            value={username}
            onChange={handleChange}
          />
        </div>

        <div>
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
          Registrar
        </button>
        have an account? <a href="/">Login</a>
      </form>
    </div>
    </>
  );
}
export default Signup;
