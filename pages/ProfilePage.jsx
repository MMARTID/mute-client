import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import service from "../services/config.services";

import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  console.log(userId,'jusjus');
  const { isLoggedIn,loggedUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const { username, email, role, profilePicture } = user;

  

  useEffect(() => {

    const fetchDinamicProfile = async () => {
      let response;
      if (!loggedUserId) {
        response = await axios.get(`http://localhost:5005/api/users/${userId}`);
      } else {
        response = await service.get(`http://localhost:5005/api/users/${userId}`);
      }
      console.log(response.data,' queee');
      setUser(response.data)
    }
    if (userId) {
      fetchDinamicProfile()
    }
    
  }, [userId]);
console.log(user);
  
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    service
      .get(`http://localhost:5005/api/posts/${userId}`)
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {});
  }, [userId]);
  console.log(userPosts);

  return (
    <>
      <img
        src="http://localhost:5005/default-profile-pic.jpeg"
        alt=""
        style={{ borderRadius: "50%" }}
      />
      <h1>{username}</h1>
      <p> publicaciones: {userPosts.length}</p>

      <div className="post-container">
        {userPosts.map((post) => (
          <PostCard
            key={post._id}
            title={post.title}
            content={post.content}
            author={post.author}
            visibility={post.visibility}
          />
        ))}
      </div>
    </>
  );
}

export default ProfilePage;
