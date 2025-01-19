function PostCard({  title , content, author, visibility}) {
  const styles = {
    container: {
      display: "flex",
      border: "1px solid #e1e8ed",
      borderRadius: "8px",
      marginBottom: "15px",
      padding: "15px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      minWidth: "500px",
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
      flex: 1,
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
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.imageWrapper}>
        <img
          src="http://localhost:5005/default-profile-pic.jpeg"
          alt="Profile"
          style={styles.image}
        />
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <div style={styles.authorInfo}>
            <span style={styles.authorName}>
              {author?.username || "Anónimo"}
            </span>
            <span style={styles.username}>
              @{author?.username?.toLowerCase() || "anonimo"}
            </span>
          </div>

          {visibility && <span style={styles.visibility}>{visibility}</span>}
        </div>

        <p style={styles.content}>{content}</p>
      </div>
    </div>
  );
}

export default PostCard;