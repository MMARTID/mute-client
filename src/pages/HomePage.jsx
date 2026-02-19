import SendPost from "../components/SendPost.jsx";
import PostCard from "../components/PostCard";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services.js";
import { useParams } from "react-router-dom";

import { usePopup } from "../context/popUp.context.jsx";

function HomePage(params) {
  const { userId } = useParams();

  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const [dynamicPosts, setdynamicPosts] = useState([]);
  const [type, setType] = useState("all");
  const { shouldRefresh } = usePopup();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FUNCION ASINCRONA, LA PASAMOS AL COMPONENTE QUE MANEJA EL ENVIO DEL FORMULARIO,
  // UNA VEZ ACTIVADA, ACTUALIZA EL ESTADO DE LOS POSTS EN HOMEPAGE.
  const updatePosts = (newPost) => {
    setdynamicPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchdynamicPosts = async () => {
      setLoading(true);
      setError(null);
      let response;
      try {
        if (!isLoggedIn) {
          response = await service.get(`/posts`, { signal: controller.signal });
        } else {
          response = await service.get(`/posts/all/${type}`, { signal: controller.signal });
        }
        setdynamicPosts(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
        setError(err.message);
      }
      } finally {
        setLoading(false);
      }
    };

    fetchdynamicPosts();
    return () => controller.abort();
  }, [shouldRefresh, type, isLoggedIn]);

  return (
    <>
      <div className="homepage-container">
        {isLoggedIn && (
          <div className="filter-buttons">
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
          {/* MODAL DynamicO*/}
          <SendPost updatePosts={updatePosts} />
          <div className="posts">
            {Array.isArray(dynamicPosts) &&
              dynamicPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
