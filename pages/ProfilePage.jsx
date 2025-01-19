import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

import PostCard from "../components/PostCard";

function ProfilePage() {
  const { loggedUserId } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const { username, email, role, profilePicture } = user;

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/users/${loggedUserId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loggedUserId]);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/posts/${loggedUserId}`)
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {});
  }, [loggedUserId]);
  console.log(userPosts);

  return (
    <>
    <img src="http://localhost:5005/default-profile-pic.jpeg" alt="" style={{borderRadius: '50%'}}/>
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
