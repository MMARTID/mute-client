import { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import { AuthContext } from "../context/auth.context";
import { usePopup } from "../context/popUp.context";


function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const { loggedUserId } = useContext(AuthContext);
 

const styles = {
    commentContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      borderBottom: "1px solid #e1e8ed",
      paddingBottom: "10px",
    },
    commentContent: {
      marginLeft: "10px",
      textAlign: "left"
    },
    commentAuthor: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
      textAlign: "left"
    },
    commentText: {
      fontSize: "14px",
    },
  };


  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("fetching comments...");
        const response = await service.get(`/comments/${postId._id}`);
        setAuthorData(postId.author);
        setComments(response.data, authorData);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [loggedUserId]);
  console.log("comentarios: ", comments);
  return (
    <>
      {comments.map((comment) => (
        <div style={styles.commentContainer} key={comment._id}>
          <img
            src="http://localhost:5005/default-profile-pic.jpeg"
            alt=""
            style={{ borderRadius: "50%", widthdth: "40px", height: "40px", marginLeft: "10px"}}
          />
          <div style={styles.commentContent}>
            <div style={styles.commentAuthor}>{comment.author.username}</div>
            <div style={styles.commentText}>{comment.content}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CommentsSection;
