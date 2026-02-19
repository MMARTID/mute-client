import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { usePopup } from "../context/popUp.context.jsx";
import service from "../services/config.services.js";

export function useSendPostLogic() {
  const { loggedUserId } = useContext(AuthContext);
  const { 
     formType,
     postDetails,
     hidePopup,     
     triggerRefresh,
     addComment
    } = usePopup();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("all");
  const [visibility, setVisibility] = useState("general");
  const [errorMessage, setErrorMessage] = useState();
  const [comments, setComments] = useState([]);

  const resetForm = () => {
    setType("all");
    setVisibility("general");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formType === "post") {
        if (!title.trim()) return alert("El título no puede estar vacío.");
        if (!content.trim()) return alert("El contenido no puede estar vacío.");

        await service.post(`/posts/${loggedUserId}`, {
          title,
          content,
          visibility,
          type,
          loggedUserId,
        });

        triggerRefresh();
        resetForm();
        hidePopup();
        return;
      }

      if (formType === "comment" || formType === "viewPost") {
        const response = await service.post(
          `/comments/${postDetails._id}`, { content })
        addComment(response.data);

        resetForm();
        triggerRefresh();
        return;
      }
    } catch (error) {
      console.error("Error submitting:", error);
      setErrorMessage("Error submitting");
    }
  };

  const handleDelete = async () => {
   try {
      await service.delete(`/posts/${postDetails._id}`);
      triggerRefresh();   // 🔥 Actualiza lista de posts
      hidePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    // estados
    content,
    setContent,
    title,
    setTitle,
    type,
    setType,
    visibility,
    setVisibility,
    errorMessage,
    setErrorMessage,
    comments,
    setComments,

    // funciones
    handleSubmit,
    handleDelete,
  };
}
