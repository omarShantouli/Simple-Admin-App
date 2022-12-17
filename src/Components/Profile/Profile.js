import React, { useState } from 'react';
import { getAuth, updatePassword } from "firebase/auth";
import app from '../../Utils/Firebase';
import "./Profile.scss"
import NavBar from '../NavBar/NavBar';

export default function Profile() {
    const [newPassword, setNewPassword] = useState("");
    const auth = getAuth(app);

    function changePassword(e){
        e.preventDefault();
        const user = auth.currentUser;

        updatePassword(user, newPassword).then(() => {
        window.alert("Password changed successfully")
        }).catch(() => {
        window.alert("something went wrong")
        });
        setNewPassword("");
    }

  return (
    <>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center min-vh-100 min-vw-100" style={{width: "50vh"}}>
          <form onSubmit={changePassword} className='d-flex align-items-center flex-column w-100'>
          <div className='h5 text-secondary'>New Password</div>
          <input type="password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} className='mt-3 rounded-1 border-0'/>
          <button className='btn mt-3 text-white rounded-1' style={{backgroundColor: "#2E0259"}}>Change Password</button>
          </form>
      </div>
    </>
  )
}
