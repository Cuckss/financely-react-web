import React, { useEffect } from "react";
import "./styles.css"
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
const Header=()=>{
    const navigate=useNavigate();
    const [user, loading] = useAuthState(auth);
    useEffect(()=>{
       if(user){
        navigate("/dashboard")
       }
    },[user,loading])
    function logout(){
        try{
          signOut(auth)
          .then(()=>{
            toast.success("logged out successfully")
            navigate("/")
            return;
          })
          .catch((error)=>{
            toast.error(error.message)
            return;
          })
        }catch(error){
          toast.error(error.message)
        }
    }
    console.log(user)
    function scrollToTop(){
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Optional: smooth scrolling animation
    });
    }
    return(
        <div className="navbar">
         <p className="navbar-logo" onClick={scrollToTop}>Financely</p>
        {
            user && (
                <div className="user-div">
                  {
                    user.photoURL?(
                      <img src={user.photoURL}/>
                    ):(
                      <div className="header-icon">{user.email.slice(0,1).toUpperCase()}</div>
                    )
                  }
                
                <p className="navbar-btn" onClick={logout}>Logout</p>
                </div>
            )
        }
        </div>
    )
}
export default Header;
