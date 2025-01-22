import { useState, useContext, useEffect } from "react";
import { usePopup } from "../context/popUp.context.jsx";
import { AuthContext } from "../context/auth.context.jsx";
import service from "../services/config.services.js";
import PostCard from "./PostCard.jsx";
import CommentsSection from "./CommentsSection.jsx";
import EditProfile from "./EditProfile.jsx";
import PostForm from "./PostForm.jsx";
function SendPost() {
  const { loggedUserId } = useContext(AuthContext);
  const { isVisible, formType, postDetails, userProfile, hidePopup } = usePopup();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("general");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Solo actualiza el perfil cuando el formType es 'editProfile' y hay detalles de perfil
    if (formType === "editProfile" && postDetails) {
      setProfileData({ name: postDetails.name, email: postDetails.email });
    }
  }, [formType, postDetails]); // Dependencia para que se ejecute solo cuando formType o postDetails cambien

  const resetForm = () => {
    setContent("");
    setTitle("");
    setVisibility("general");
  };
 console.log(postDetails)
  // MANEJO DEL FORMULARIO PARA POST O COMMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formType === "post") {
        if (!title.trim()) {
          alert("El título no puede estar vacío.");
          return;
        }
        await service.post(`/posts/${loggedUserId}`, {
          title,
          content,
          visibility,
          loggedUserId,
        });
        resetForm();
        hidePopup()
      } else if (formType === "comment" || formType === "viewPost") {
        const response = await service.post(`/comments/${postDetails._id}`, {
          content,
        });
        resetForm();
        
      }
    } catch (error) {
      console.error("Error submitting:", error);

    }
  };
  if (!isVisible) return null;
// console.log('comparative:',loggedUserId === postDetails.author._id)
  //!-------- renderiza el formulario para editar el perfil
  const renderEditProfile = () => (
    <form onSubmit={handleSubmit}>
      <EditProfile user={userProfile} />
    </form>
  );
  //! ---------------------------------------------RENDERIZA EL FORMULARIO PARA CREAR UN POST
  const renderPostForm = () => (
    <PostForm
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      visibility={visibility}
      setVisibility={setVisibility}
      handleSubmit={handleSubmit}
    />
  );

  //!-------------------------------------------------RENDERIZA LA VISTA GENERAL DE UN POST
  const renderViewPost = () => (
    <>
      <PostCard post={postDetails} />
      <CommentsSection postId={postDetails} />
      <div style={{ display: "flex", marginTop: "1rem" }}></div>
    </>
  );
  //!--------------------------------------------------------------------------------------------------
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content ">
          {/* Header */}
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h4>
              {formType === "post" && "Create a Post"}
              {formType === "viewPost" && postDetails?.title}
              {formType === "editProfile" && "Edit Profile"}
            </h4>
            {loggedUserId === postDetails?.author._id && (
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => service.delete(`/posts/${postDetails._id}`)}
                ></button>
            )}
         
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={hidePopup}
            >
              
            </button>
          </div>
          
          {/* Body */}
          <div className="modal-body p-0">
            {formType === "post" && renderPostForm()}
            {formType === "viewPost" && renderViewPost()}
            {formType === "editProfile" && renderEditProfile()}
          </div>

          {/* Footer */}
          {formType === "viewPost" && (
            <div className="modal-footer">
              <div className="d-flex align-items-center w-100">
                <input
                  className="form-control mr-2"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Add a comment"
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendPost;
