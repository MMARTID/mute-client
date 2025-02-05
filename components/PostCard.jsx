import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { usePopup } from "../context/popUp.context";
import service from "../services/config.services";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

function PostCard({ post }) {
  const { showPopup, isVisible } = usePopup();
  const { loggedUserId } = useContext(AuthContext);
  const [like, setLike] = useState(false)
  const [likeNum, setLikeNum] = useState(post.likes.length)

 // Función para determinar la imagen del like
 const likeSVG = () => {
  if (!like) {
    return <FcLikePlaceholder className="like-icon" onClick={handleLike}/>
  }
  return <FcLike className="like-icon" onClick={handleDisLike}/>
};
 // Función para determinar la imagen del perfil
 const getProfileImage = () => {
  if (loggedUserId) {
    return <img src={post.author.profilePicture} alt="Profile" className="image" />;
  }
  return <img src={`${import.meta.env.VITE_SERVER_URL}/default-profile-pic.jpeg`} alt="Profile" className="image" />;
};

// Función para añadir el like
const handleLike = () => {
  service.patch(`/posts/${post._id}/${loggedUserId}`);
  setLike(true)
  setLikeNum(likeNum + 1)
};
// Función para eliminar el like
const handleDisLike = () => {
  service.patch(`/posts/${post._id}/${loggedUserId}`);
  setLike(false)
  setLikeNum(likeNum - 1)
};

// Función para abrir el popup al hacer clic en el post
const handlePostClick = () => {
  if (!isVisible) showPopup("viewPost", post);
};

return (
  <div className="post-container">
    {/* Imagen del post */}
    <div className="image-wrapper">
      <Link to={loggedUserId ? `/profile/${post.author._id}` : "/login"}>
        {getProfileImage()}
      </Link>
    </div>

    <div style={{ flex: "1" }}>
      <div className="content-wrapper" onClick={handlePostClick}>
        <div className="header">
          <div className="author-info">
            <span className="author-name">
              {post.author.username || "Anónimo"}
            </span>
            <span className="username">
              @{post.author.username?.toLowerCase() || "anonimo"}
            </span>
          </div>

          <span className="visibility">{post.visibility}</span>
        </div>
        <div className="content">
          <p>{post.content}</p>
        </div>
      </div>

      <div className="interaction-container">
        <div className="like-container">
          <p className="like-count">{likeNum}</p>
          {likeSVG()}
        </div>
      </div>
    </div>
  </div>
);
}

export default PostCard;
