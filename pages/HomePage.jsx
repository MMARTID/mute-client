import { Link } from "react-router-dom"
import Private from "../components/auth/Private";
import SendPost from "../components/SendPost";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage(params) {

    const { isLoggedIn } = useContext(AuthContext)

    return (
        <>
      { isLoggedIn && 
      <div className="container">
            <SendPost />
       </div> }
        
        </>
    
        
       
    )
}
export default HomePage