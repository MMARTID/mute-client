import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services";
const styles = {
  form: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  fieldContainer: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    height: "120px",
    resize: "none",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
}
function SendPost() {
 const { loggedUserId } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    visibility: 'general',
    author : loggedUserId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post Submitted:', formData);
    service.post(`http://localhost:5005/api/posts/${loggedUserId}`, formData)
  };

  return (
   
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.fieldContainer}>
        <label htmlFor="title" style={styles.label}>
          Título:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Escribe el título"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.fieldContainer}>
        <label htmlFor="content" style={styles.label}>
          Contenido:
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Escribe el contenido"
          style={styles.textarea}
          required
        />
      </div>

      <div style={styles.fieldContainer}>
        <label htmlFor="visibility" style={styles.label}>
          Visibilidad:
        </label>
        <select
          id="visibility"
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="general">General</option>
          <option value="private">Private</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          ...styles.button,
        }}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
      >
        Publicar
      </button>
    </form>

  )
}
export default SendPost