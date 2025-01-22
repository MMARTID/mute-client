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
  const [ user, setUser] = useState({});
  const { username, email, role, profilePicture } = user;
  const { loggedUserId } = useContext(AuthContext)
  const { showPopup } = usePopup();

  useEffect(() => {
    service
      .get(`/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [userId]);
  
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    service
      .get(`/posts/${userId}`)
      .then((response) => {
        console.log(response)
        setUserPosts(response.data);
      })
      .catch((error) => {});
  }, [userId]);


  return (
    <div style={{minHeight: "100vh", width: "100%", padding: "20px"}}>
    
      <img
        src="http://localhost:5005/default-profile-pic.jpeg"
        alt=""
        style={{ borderRadius: "50%" }}
      />

      <h1>{username}</h1>
      <p> publicaciones: {userPosts.length}</p>


      {loggedUserId === userId && 

      <button
       onClick={() => showPopup("editProfile", userId)}
      >Editar perfil
      </button>

      }
     
     
     <SendPost />


      <div style={{marginTop: "20px"}} >
        {userPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;

