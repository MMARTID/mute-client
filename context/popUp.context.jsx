import React, { createContext, useState, useContext } from 'react';
import service from "../services/config.services";
import { AuthContext } from './auth.context';
import { useParams } from 'react-router-dom';
// ESTE CONTEXTO SE ENCARGARGA DE GESTIONAR EL ESTADO DEL COMPONENTE DynamicModal.jsx
// PASAMOS LOS ESTADOS COMO PROPS AL COMPONENTE HIJO APP.JSX

const PopupContext = createContext();

// CREAMOS EL PROVIDER QUE VA A ENVOLVER A APP EN MAIN
export function PopupProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [formType, setFormType] = useState('');
  const [postDetails, setPostDetails] = useState(null);
  const [ userProfile, setUserProfile ] = useState(null);

  const { loggedUserId } = useContext(AuthContext);
  
  //! COMPONENTE : PASARLO AL COMPONENTE QUE PODRA ABRIR EL MODAL
  const showPopup = async (type, details = null) => {
    setFormType(type);
    if (type === "editProfile") {
      try {
        const { data } = await service.get(`/users/${loggedUserId}`); // Endpoint para obtener info del usuario
        setUserProfile(data);
      } catch (error) {
        console.error("Error al cargar los datos del perfil del usuario:", error);
      }
    } else if (details) {
      setPostDetails(details);
    }
    setIsVisible(true);
  };
  //! MODAL : PASARLO AL MODAL PARA CERRARLO SOLO CUANDO ESTA ABIERTO
  const hidePopup = () => {
    setIsVisible(false);
    setPostDetails(null)
    setFormType('');
    setUserProfile(null)
  };

  return (
    <PopupContext.Provider value={{ isVisible, formType, postDetails, userProfile, setUserProfile, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);