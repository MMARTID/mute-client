import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";

const AuthContext = createContext()

// Componente wrapper que pasara la data a todos los componentes hijos,
// La data que se almacena aqui es la del usuario loggeado
// Esta funcion no empezara a ejecutarse hasta que el usuario este loggeado
// una vez loggeado, se ejecutara el useEffect y se comprobara el token cada vez que cargue el componente
function AuthWrapper(props) {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ loggedUserId, setLoggedUserId ] = useState(null)
    const [ userRole, setUserRole ] = useState(null)//! BONUS 'tourist' default cuando no se han loggeado
  
    //activado, hasta que se loggea, luego se desactiva para usar el useEffect 
    const [ isAuthenticating, setIsAuthenticating] = useState(true)
  
    const authenticateUser = async() => {
      setIsAuthenticating(true) // forzar la carga del spinner al momento de validar el token
  
      // valida el token a traves de services y actualiza los estados para decirle a los componentes hijos que el usuario esta loggeado
      try {
        const response = await service.get("/auth/verify")
        
        console.log("token valido", response)
        setIsLoggedIn(true)
        setLoggedUserId(response.data.payload._id)
        setIsAuthenticating(false)
        setUserRole(response.data.payload.role)
        
      } catch (error) {
        console.log("token no valido o no existe")
        // console.log(error)
        setIsLoggedIn(false)
        setLoggedUserId(null)
        setIsAuthenticating(false)
        setUserRole(null)
      }
    }
    const logoutUser = () => {
      // eliminamos el token almacenado en lolcalStorage
      localStorage.removeItem("authToken"); 
      // limpia el estado del contexto

      setIsLoggedIn(false);
      setLoggedUserId(null);
      setUserRole(null);
      
    };
  
    const passedContext = {
      isLoggedIn,
      loggedUserId,
      authenticateUser,
      logoutUser
    }
  
    useEffect(() => {
      authenticateUser()
    }, [])
  
    if (isAuthenticating) {
      return <div><h3>... Validando usuario</h3></div>
    }
  
    return (
      <AuthContext.Provider value={passedContext}>
        {props.children}
      </AuthContext.Provider>
    )
  
  }
  
  export {
    AuthContext,
    AuthWrapper
  }