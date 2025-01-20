import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";

function Login() {


  const { authenticateUser, loggedUserId } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
   
    setFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userKey = {
      email : formData.email,
      password : formData.password,
    }
console.log(loggedUserId)
    try {
     const response = await service.post("/auth/login", userKey);
     const {authToken , userId} = response.data
      console.log("Login exitoso, y chao 🚀");
      localStorage.setItem("authToken", authToken)
      authenticateUser()
     
      navigate(`/home/${userId}`); // Redirige al dashboard si el login es exitoso
    } catch (e) {
      console.log(e , "Error en la solicitud");
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
            value={formData.email}
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
            value={formData.password}
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