import React from 'react'
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import { useContext } from "react";
import { GlobalContext } from "../../Utils/context"
import "../NavBar/NavBar.scss"
import {signOut, getAuth} from "firebase/auth"
import app from '../../Utils/Firebase';

export default function NavBar() {
   const contextData = useContext(GlobalContext);
   const auth = getAuth(app);

   function logOut(){
        signOut(auth);
        contextData.setLoginFlag(true);
        localStorage.clear();
        contextData.setCreateAccountFlag(true);
   }

  return (
    <div className='d-flex navBar min-vw-100'>
        <div className='text-white d-flex align-items-center justify-content-center h2'>
            React Auth
        </div>
        {
            contextData.loginFlag ?
                //<div className='ms-auto me-4 border-0  pt-3 pb-2 text-white h6'>
                <button className='d-flex align-items-center justify-content-center h-100 border-0 text-white h6 pt-3 pb-3 ms-auto'
                    style={{backgroundColor: "#2E0259"}}
                    onClick={()=>{contextData.setCreateAccountFlag(true);}}
                    >
                        Login
                </button>
               // </div>
            :
            <div className='ms-auto me-4 border-0  pt-3 pb-2 text-white h6'>
                <span className='me-4'>
                    {localStorage.getItem('email').split('@')[0]}'s Profle
                </span>
                <button className='btn pt-2 text-white h6 active'
                    style={{backgroundColor: "#2E0259"}}
                    onClick={logOut}
                    >
                        Logout
                </button>
                </div>
            
        }
    </div>
  )
}
