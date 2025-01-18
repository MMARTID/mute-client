import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
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



  return (
    <>
      <h1>perfil de {username}</h1>

    </>
  );
}

export default ProfilePage;
