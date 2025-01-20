import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services";

import SendPost from "../components/DynamicModal";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [ user, setUser] = useState({});
  const { username, email, role, profilePicture } = user;

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
      .get(`http://localhost:5005/api/posts/${userId}`)
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {});
  }, [userId]);


  return (
    <>
      <img
        src="http://localhost:5005/default-profile-pic.jpeg"
        alt=""
        style={{ borderRadius: "50%" }}
      />
      <h1>{username}</h1>
      <p> publicaciones: {userPosts.length}</p>
      
      <SendPost />
      <div className="post-container">
        {userPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </>
  );
}

export default ProfilePage;
