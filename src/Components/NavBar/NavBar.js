import React from "react";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import { useContext } from "react";
import { GlobalContext } from "../../Utils/context";
import "../NavBar/NavBar.scss";
import { signOut, getAuth } from "firebase/auth";
import app from "../../Utils/Firebase";
import { useNavigate } from "react-router-dom";




export default function NavBar() {
  const contextData = useContext(GlobalContext);
  const auth = getAuth(app);
  const nav = useNavigate();
     

  function logOut() {
    signOut(auth);
    contextData.setLoginFlag(true);
    localStorage.clear();
    contextData.setCreateAccountFlag(true);
    nav('/');
  }

  return (
      <div className="d-flex navBar min-vw-100">
        <div className="text-white d-flex align-items-center justify-content-center h2">
          React Auth
        </div>
          
          <div className="border-0  pt-3 pb-2 text-white h6 profile">

            <button className="btn pt-2 text-white h6 btn2" onClick={()=>{nav('/profile')}}>
              {localStorage?.getItem("email")?.split("@")[0]}'s Profle
            </button>

            <button className="btn pt-2 text-white h6 me-4 btn2" onClick={()=>{nav('/')}}>
              Home
            </button>
       
            <button className="btn pt-2 text-white h6 active" onClick={logOut}>
              Logout
            </button>
          </div>
       
      </div>
  );
}
