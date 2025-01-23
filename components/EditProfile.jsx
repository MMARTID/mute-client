import { useState, useEffect } from "react";
import service from "../services/config.services.js";
import Cloudinary from "./Cloudinary.jsx";


function EditProfile({ user }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  // Se inicializan los campos con los datos actuales del usuario
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setProfilePicture(user.profilePicture || "");
    }
    console.log(user);
  }, [user]);

  // Función para manejar el submit del formulario
  const handleSave = async () => {
    const updatedUser = {username, email, profilePicture };
    try {
      const response = await service.patch(`/users/${user._id}`, updatedUser);

      if (response) {
        console.log("Usuario actualizado:", response.data);
        // Aquí podrías hacer algo más, como redirigir o mostrar un mensaje de éxito
      } else {
        console.error("Error al actualizar el perfil:", response.error);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    width: "100%",
    backgroundColor: "white",
    color: "#333"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  }
};
  return (
    <div style={styles.container}>
      

      <div style={styles.form}>

      <span className="section-title">Profile picture</span>
        <div className="profile-picture-section">
          <img
            src={user.profilePicture}
            alt="imagen"
            style={{ border: "1px solid lightgrey", borderRadius: "49%", width: "100px", height: "100px" }}
          />
          <Cloudinary profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
        </div>

        <span className="section-title">Username</span>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <span className="section-title">Email</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleSave} style={styles.button}>
        Save
      </button>
    </div>
  );
}



export default EditProfile;