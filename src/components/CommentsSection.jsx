import { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import { AuthContext } from "../context/auth.context";
import { usePopup } from "../context/popUp.context";

import { MdDeleteOutline } from "react-icons/md";

function CommentsSection() {
  const { comments, removeComment } = usePopup();
  const { loggedUserId } = useContext(AuthContext);


  const styles = {
    commentContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      borderBottom: "1px solid #e1e8ed",
      paddingBottom: "10px",
    },
    commentContent: {
      marginLeft: "10px",
      textAlign: "left",
    },
    commentAuthor: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
      textAlign: "left",
    },
    commentText: {
      fontSize: "14px",
    },
  };
   const handleDelete = async (id) => {
    try {
      await service.delete(`/comments/${id}`);
      removeComment(id); // ⬅️ actualiza el estado global
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  return (
    <>
      {comments.map((comment) => (
        <div style={styles.commentContainer} key={comment._id}>
          
          <div style={styles.commentContent}>
            <div style={styles.commentAuthor}>{comment.author.username}</div>
            <div style={styles.commentText}>{comment.content}</div>
          </div>
          {String(loggedUserId) === String(comment.author._id) && (
            <button
              className="delete-comment"
              style={{ marginRight: "10px" }}
              onClick={() => handleDelete(comment._id)}
            >
              <MdDeleteOutline />
            </button>
          )}
        </div>
      ))}
    </>

  );
}

export default CommentsSection;
