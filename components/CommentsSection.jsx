import { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import { AuthContext } from "../context/auth.context";
import { usePopup } from "../context/popUp.context";

import { MdDeleteOutline } from "react-icons/md";

function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const { loggedUserId } = useContext(AuthContext);
  const { isVisible } = usePopup();

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


    const fetchComments = async () => {
      try {
        console.log("fetching comments...");
        const response = await service.get(`/comments/${postId._id}`);
        setAuthorData(postId.author);
        setComments(response.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }

    };
    
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);
  
  return (
    <>
      {comments.map((comment) => (
        <div style={styles.commentContainer} key={comment._id}>
          
          <div style={styles.commentContent}>
            <div style={styles.commentAuthor}>{comment.author.username}</div>
            <div style={styles.commentText}>{comment.content}</div>
          </div>
          {loggedUserId === comment.author._id && (
            <button className="delete-comment"style={{marginRight:'10px'}} onClick={() => service.delete(`/comments/${comment._id}`) }>
              <MdDeleteOutline />
            </button>
          )}
        </div>
      ))}
    </>

  );
}

export default CommentsSection;
