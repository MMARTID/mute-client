import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { usePopup } from "../context/popUp.context";
import SendPost from "./DynamicModal";
import { FaComment } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import service from "../services/config.services";
function PostCard({ post }) {
  const { showPopup, isVisible, formType } = usePopup();

  const styles = {
    container: {
      display: "flex",
      border: "1px solid #e1e8ed",
      borderRadius: "8px",
      marginBottom: "15px",
      padding: "15px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      minWidth: "490px",
    },
    imageWrapper: {
      marginLeft: "-5px",
      marginRight: "10px",
    },
    image: {
      width: "50px",
      height: "auto",
      borderRadius: "50%",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "10px",
    },
    authorInfo: {
      display: "flex",
      flexDirection: "column",
    },
    authorName: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#14171a",
    },
    username: {
      fontSize: "12px",
      color: "#657786",
    },
    visibility: {
      fontSize: "12px",
      color: "#657786",
      fontStyle: "italic",
    },
    content: {
      fontSize: "14px",
      color: "#14171a",
      marginTop: "10px",
      display: "flex",
      alignItems: "flex-start",
      textAlign: "left",
    },
  };

  const { loggedUserId } = useContext(AuthContext);
  return (
    <div style={styles.container} className="post-container">
      {/* IMAGEN DEL POST  */}
      <div style={styles.imageWrapper}>
        {/* SI NO ESTA LOGGUEADO REDIRIGUE AL LOGIN*/}
        {loggedUserId ? (
          <Link to={`/profile/${post.author._id}`}>
            <img
              src="http://localhost:5005/default-profile-pic.jpeg"
              alt="Profile"
              style={styles.image}
            />
          </Link>
        ) : (
          <Link to={"/login"}>
            <img
              src="http://localhost:5005/default-profile-pic.jpeg"
              alt="Profile"
              style={styles.image}
            />
          </Link>
        )}
      </div>

      {/* SI EL MODAL NO ESTA DESPLEGADO , MUESTRA EL MODAL AL TOCAR EL CONTENDIO DEL POST */}
      {/* EVITAR RE-RENDERIZADOS DEL POPUP */}
      <div style={{ flex: "1" }}>
        <div
          style={styles.contentWrapper}
          className="post-data-container"
          onClick={!isVisible ? () => showPopup("viewPost", post) : undefined}
        >
          <div>
            {/* ---------------------------------------------------------------------------------- */}

            <div style={styles.header}>
              <div style={styles.authorInfo}>
                <span style={styles.authorName}>
                  {post.author.username || "Anónimo"}
                </span>
                <span style={styles.username}>
                  @{post.author.username?.toLowerCase() || "anonimo"}
                </span>
              </div>

              <span style={styles.visibility}>{post.visibility}</span>
            </div>
            <div style={styles.content}>
              <p>{post.content}</p>
            </div>
          </div>
        </div>


        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",flexDirection: 'row-reverse', marginTop: "15px", fontSize: "14px", color: "#657786" }}>
  <div style={{ display: "flex", flexDirection: 'row-reverse', alignItems: "center", gap: "5px" }}>
    {/* Mostrar cantidad de likes */}
    <p style={{ margin: "0px", padding:'0'  }}>{post.likes.length}</p>
    {/* Icono de Like */}
    <FcLikePlaceholder
      onClick={() => service.patch(`/posts/${post._id}/likes`)}
    />
  </div>

  {/* Icono de Comentarios */}
  {!isVisible && (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <FaComment onClick={() => showPopup("viewPost", post)} />
    </div>
  )}
</div>

      </div>
    </div>
  );
}

export default PostCard;
