import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";



function Private(props) {

// utilizando el estado de isLogginedIn contexto.
// en este caso, solo con estar loggeado podrias acceder a la ruta
  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    return props.children 
  } else {
    //redirige a la ruta de login siguiendo el flujo de usuario
    return <Navigate to={"/login"}/>
  }

}

export default Private