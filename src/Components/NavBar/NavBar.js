import React from "react";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import { useContext } from "react";
import { GlobalContext } from "../../Utils/context";
import "../NavBar/NavBar.scss";
import { signOut, getAuth } from "firebase/auth";
import app from "../../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";




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
    <>
    <div className="d-flex navBar min-vw-100">
    <Navbar collapseOnSelect expand="lg" variant="dark" className="min-vw-100">
        <div className="text-white d-flex align-items-center justify-content-center h2">
           React&nbsp;&nbsp;Auth  
        </div>
       
    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto me-5"/>
    
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ms-auto profile">
        

            <button className="btn pt-2 text-white h6 btn2" onClick={()=>{nav('/profile')}}>
                {localStorage?.getItem("email")?.split("@")[0]}'s Profle
            </button>

            <button className="btn pt-2 text-white h6 me-4 btn2" onClick={()=>{nav('/')}}>
                Home
            </button>

            <button className="btn pt-2 text-white h6 active" onClick={logOut}>
                Logout
            </button>
        
        
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</div>
      {/* <div className="d-flex navBar min-vw-100">
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
       
      </div> */}
      </>
  );
}
