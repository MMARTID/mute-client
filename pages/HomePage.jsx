import { Link } from "react-router-dom";
import Private from "../components/auth/Private";
import Layout from "../components/Layout";
import SendPost from "../components/SendPost";
import PostCard from "../components/PostCard";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import service from "../services/config.services";

function HomePage(params) {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const [dinamicPosts, setDinamicPosts] = useState([]);

  // FUNCION ASINCRONA, LA PASAMOS AL COMPONENTE QUE MANEJA EL ENVIO DEL FORMULARIO,
  // UNA VEZ ACTIVADA, ACTUALIZA EL ESTADO DE LOS POSTS EN HOMEPAGE.
  const updatePosts = (newPost) => {
    setDinamicPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    const fetchDinamicPosts = async () => {
      let response;
      if (!isLoggedIn) {
        response = await service.get(`/posts`);
      } else {
        response = await service.get("/posts/all");
      }
      setDinamicPosts(response.data);
    };
    fetchDinamicPosts();
  }, [isLoggedIn]);

  console.log(dinamicPosts);

  return (
    <div className="homepage">
      {isLoggedIn && (
        <div className="form">
          <SendPost props={loggedUserId} updatePosts={updatePosts} />

          <nav></nav>
        </div>
      )}

      <div className="posts">
        {dinamicPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
