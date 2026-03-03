import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services.js";
import { usePopup } from "../context/popUp.context.jsx";

import SendPost from "../components/SendPost.jsx";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const { username, email, role, profilePicture, followers, following } = user;
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
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  //SEGUIR A UN USUARIO
  const handleFollow = () => {
    service
      .post(`/users/${userId}/follow`)
      .then((response) => {
        console.log(response);
        setUser((prevUser) => ({
          ...prevUser,
          followers: [...prevUser.followers, loggedUserId],
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  return (
    <div className="profile-container">
      <img
        src={profilePicture}
        alt="profile-picture"
        className="profile-picture"
      />

      <h1 className="profile-username">{username}</h1>

      <div className="profile-stats">
        <p>Posts: {userPosts.length}</p>
        <p>Followers: {followers ? followers.length : 0}</p>
        <p>Following: {following ? following.length : 0}</p>
      </div>

      {loggedUserId === userId ? (
        <button
          className="profile-btn"
          onClick={() => showPopup("editProfile", { user, setUser })}
        >
          Edit profile
        </button>
      ) : (
        <button className="profile-btn" onClick={handleFollow}>
          Follow
        </button>
      )}

      <SendPost />

      <div className="posts-container">
        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
