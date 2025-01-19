import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
function ProfilePage() {

  const { loggedUserId } = useContext(AuthContext);

  const [ user , setUser ] = useState({});
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


const [ userPosts , setUserPosts ] = useState([]);

useEffect(() =>{ 
    axios
    .get(`http://localhost:5005/api/posts/${loggedUserId}`)
    .then((response) => {
      setUserPosts(response.data);
      
    })
    .catch((error) => {
    
    });
},[loggedUserId]);
console.log(userPosts)

  return (
    <>
      <h1>perfil de {username}</h1>


      
        <div className="post-container" style={{backgroundColor: 'blue'}}>
        
           {userPosts.map((post) => (
            <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            </div>
           ))}
        </div>
      
    </>
  );
}

export default ProfilePage;
