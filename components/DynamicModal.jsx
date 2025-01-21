import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../context/popUp.context.jsx";
import { AuthContext } from "../context/auth.context.jsx";
import service from "../services/config.services.js";
import PostCard from "./PostCard.jsx";
import CommentsSection from "./ComponentsSection.jsx";

function SendPost() {
  const { loggedUserId } = useContext(AuthContext);
  const { isVisible, formType, postDetails, hidePopup } = usePopup();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
console.log('POSTDETAILS ENVIDOS AL COMP D COMNTS',postDetails)
  const resetForm = () => {
    setContent("");
    setTitle("");
  };

  // MANEJO DEL FORMULARIO PARA POST O COMMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("El contenido no puede estar vacío.");
      return;
    }

    try {
      if (formType === "post") {
        if (!title.trim()) {
          alert("El título no puede estar vacío.");
          return;
        }
        await service.post(`/posts/${loggedUserId}`, { title, content, loggedUserId });
        resetForm();


      } else if (formType === "comment" || "viewPost") {
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

  //! ---------------------------------------------RENDERIZA EL FORMULARIO PARA CREAR UN POST
  const renderPostForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      />
      <textarea
        className="form-control"
        name="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
      />
      <button type="submit" className="btn btn-primary mt-3">
        Post
      </button>
    </form>
  );

  //!-------------------------------------------------FORMULARIO CREAR AGREGAR UN COMENTARIO
  const renderCommentForm = () => (
    <form onSubmit={handleSubmit}>
      <textarea
        className="form-control"
        name="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
        rows="4"
      />
      <button type="submit" className="btn btn-primary mt-3">
        Comment
      </button>
    </form>
  );

  //!-------------------------------------------------RENDERIZA LA VISTA GENERAL DE UN POST 
  const renderViewPost = () => (
    <>
      <PostCard post={postDetails} />
      <CommentsSection postId={postDetails}  />
      <div style={{ display: "flex", marginTop: "1rem" }}>
       
      </div>
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
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {formType === "post" && "Create a Post"}
              {formType === "comment" && "Add a Comment"}
              {formType === "viewPost" && postDetails?.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={hidePopup}
            >x</button>
          </div>
          <div className="modal-body p-0">
            {formType === "post" && renderPostForm()}
            {formType === "comment" && renderCommentForm()}
            {formType === "viewPost" && renderViewPost()}
          </div>
          <div className="modal-footer">
          {formType === "viewPost" && (
    <div  style={{display: 'flex'}}>
      <input
        className="form-control mb-2"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
      />
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
      >
        Submit Comment
      </button>
    </div>
  )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendPost;
