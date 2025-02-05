import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services";
import { usePopup } from "../context/popUp.context.jsx";

import SendPost from "../components/DynamicModal";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const { username, email, role, profilePicture } = user;
  const { loggedUserId } = useContext(AuthContext);
  const { showPopup, userProfile } = usePopup();

 //TRAER LA INFO DE EL USUARIO LOGUEADO
  useEffect(() => {
    service
      .get(`/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

 //TRAER LOS CAMBIOS DESDE//! EL CONTEXTO
  useEffect(() => {
    if (userProfile && userProfile._id === userId) {
      setUser(userProfile);
    }
  }, [userProfile, userId]);
  const [userPosts, setUserPosts] = useState([]);

 //TRAER LOS POSTS DE EL USUARIO CON EL ID DEL PARAMETRO
  useEffect(() => {
    service
      .get(`/posts/${userId}`)
      .then((response) => {
        console.log(response);
        setUserPosts(response.data);
      })
      .catch((error) => {});
  }, [userId]);
  

  return (
    <div style={{ minHeight: "100vh", width: "100%", padding: "20px" }}>
      <img
        src={user.profilePicture}
        alt="imagen"
        style={{ borderRadius: "49%", width: "100px", height: "100px" }}
      />

      <h1>{username}</h1>
      <p> posts: {userPosts.length}</p>

      {loggedUserId === userId && (
        <button onClick={() => showPopup("editProfile", { user, setUser })}>
          Edit profile
        </button>
      )}

      <SendPost />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >

        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        
      </div>
    </div>
  );
}

export default ProfilePage;
