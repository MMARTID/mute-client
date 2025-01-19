import { Link } from "react-router-dom"
import Private from "../components/auth/Private";
import Layout from "../components/Layout";
import SendPost from "../components/SendPost";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import service from "../services/config.services";

function HomePage(params) {

    const { isLoggedIn, loggedUserId } = useContext(AuthContext)
    const [dinamicPosts, setDinamicPosts] = useState([])
    
    useEffect(()=> {
        const fetchDinamicPosts = async () => {
            let response;
            if(!isLoggedIn){
                response = await axios.get(`http://localhost:5005/api/posts`)
            } else {
                response = await service.get('http://localhost:5005/api/posts/all')
            }
            setDinamicPosts(response.data)
        }
        fetchDinamicPosts()
    }, [isLoggedIn])
    
    
   
    return (
        <>
        
      { isLoggedIn && 
      
            <SendPost props={loggedUserId} />

        }
        <div>
            {dinamicPosts.map((eachPost) => (
                <div key={eachPost._id} className="card">
                    <h2>{eachPost.title}</h2>
                    <p>{eachPost.content}</p>
                    
                </div>
            ))}
        </div>
        </>
    
        
       
    )
}
export default HomePage