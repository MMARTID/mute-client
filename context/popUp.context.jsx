import React, { createContext, useState, useContext } from 'react';

// ESTE CONTEXTO SE ENCARGARGA DE GESTIONAR EL ESTADO DEL COMPONENTE DynamicModal.jsx
// PASAMOS LOS ESTADOS COMO PROPS AL COMPONENTE HIJO APP.JSX

const PopupContext = createContext();

// CREAMOS EL PROVIDER QUE VA A ENVOLVER A APP EN MAIN
export function PopupProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [formType, setFormType] = useState('');

  //! COMPONENTE : PASARLO AL COMPONENTE QUE PODRA ABRIR EL MODAL
  const showPopup = (type) => {
    setFormType(type);
    setIsVisible(true);
  };
  //! MODAL : PASARLO AL MODAL PARA CERRARLO SOLO CUANDO ESTA ABIERTO
  const hidePopup = () => {
    setIsVisible(false);
    setFormType('');
  };

  return (
    <PopupContext.Provider value={{ isVisible, formType, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
}



//HOOK PARA ABREVIAR

//! COMPONENTE QUE VA A RENDERIZAR EL MODAL
// import { usePopup } from ....
// { showPopUp } = usePopUp 
// ...
// USANDO LA FUNCION showPopUp('tipo de publicacion')//!'post' o 'comment
// PODEMOS GESTIONAR DISTINTOS TIPOS DE LLAMADA A LA API 

//! MODAL 
// { isVisible, formType, hidePopup } = usePopup()
export const usePopup = () => useContext(PopupContext);