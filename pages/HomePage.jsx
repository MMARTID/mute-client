import SendPost from "../components/DynamicModal";
import PostCard from "../components/PostCard";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services";
import { useParams } from "react-router-dom";

function HomePage(params) {
  const {userId} = useParams()
  console.log(userId)
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



  return (
    <>
    <div className="homepage">
     {/* MODAL DINAMICO*/}
      <SendPost />

      <div className="posts">
        {dinamicPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
    </>
  );
}
export default HomePage;
