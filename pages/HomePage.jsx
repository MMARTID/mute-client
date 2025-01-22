import SendPost from "../components/DynamicModal";
import PostCard from "../components/PostCard";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { usePopup } from "../context/popUp.context.jsx";

function HomePage(params) {
  const { userId } = useParams();

  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const [dinamicPosts, setDinamicPosts] = useState([]);
  const [type, setType] = useState("all");
  const { isVisible, postDetails, hidePopup } = usePopup();
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
        response = await service.get(`/posts/all/${type}`);
      }
      setDinamicPosts(response.data);
    };

    fetchDinamicPosts();
  }, [isLoggedIn, type, hidePopup]);

  return (
    <>
      <div className="homepage-container"
      >
        {isLoggedIn && (
          <div className="filter-buttons"
          >
            <button onClick={() => setType("all")}>
              <p>all</p>
            </button>
            <button onClick={() => setType("gaming")}>
              <p>gaming</p>
            </button>
            <button onClick={() => setType("tech")}>
              <p>tech</p>
            </button>
            <button onClick={() => setType("news")}>
              <p>news</p>
            </button>
          </div>
        )}

        <div className="homepage">
          {/* MODAL DINAMICO*/}
          <SendPost />
          <div className="posts">
            {dinamicPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
