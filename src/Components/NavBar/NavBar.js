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
    <div className='d-flex ps-5 pe-5' style={{backgroundColor: "#2E0259"}}>
        <div className='text-white pt-2 pb-2 h2'>
            React Auth
        </div>
        {
            contextData.loginFlag ?
                <div className='ms-auto me-4 border-0  pt-3 pb-2 text-white h6'>
                <button className='border-0 pt-2 text-white h6'
                    style={{backgroundColor: "#2E0259"}}
                    onClick={()=>{contextData.setCreateAccountFlag(true);}}
                    >
                        Login
                </button>
                </div>
            :
            <div className='ms-auto me-4 border-0  pt-3 pb-2 text-white h6'>
                <span className='me-4'>
                    {localStorage.getItem('email').split('@')[0]}
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
