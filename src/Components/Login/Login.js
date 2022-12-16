import React, { useContext, useEffect, useState } from 'react';
import "../Login/Login.scss";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import app from '../../Utils/Firebase';
import { GlobalContext } from '../../Utils/context';

export default function Login() {
    const storedEmail = localStorage.getItem('email') ? localStorage.getItem('email') : "";
    const storedPassword = localStorage.getItem('password') ? localStorage.getItem('password') : "";
    const [email, setEmail] = useState(storedEmail);
    const [password, setPassword] = useState(storedPassword);

    const auth = getAuth(app);
    const contextData = useContext(GlobalContext);

    useEffect(()=>{
        setEmail("");
        setPassword("");
    }, [contextData.createAccountFlag])

    function signUp()
    {
        createUserWithEmailAndPassword(auth, email, password).then(()=>{
            contextData.setLoginFlag(false);
        }).catch(() => {
            window.alert("Account is already registered… Please login")
          });
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
    }

    function signin()
    {
        signInWithEmailAndPassword(auth, email, password).then(()=>{
            contextData.setLoginFlag(false);
        }).catch(() => {
            if(email !== "" && password !== "")
             window.alert("incorrect email or password")
          });

          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
    }


  return (
        <div className='container d-flex justify-content-center'>
            <div className='d-flex flex-column align-items-center mt-5 text-white p-3 w-25 rounded login'>
                {
                    contextData.createAccountFlag ?
                    <div className='h4 mt-4'>
                        Login
                    </div>
                    :
                    <div className='h4 mt-4'>
                        Sign Up
                    </div>
                }
                    
                <form onSubmit={(e)=>{e.preventDefault()}} className='d-flex flex-column align-items-center w-100'>

                    <label htmlFor='email' className='mt-3'>Your Email</label>
                    <input type="email" id="email" className='mt-3 w-100 rounded-1 border-0' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>

                    <label htmlFor='password' className='mt-3'>Your Password</label>
                    <input type="password" id="password" className='mt-3 w-100 rounded-1 border-0' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>


                    {
                        contextData.createAccountFlag ?
                        <>
                            <button className='btn mt-3 text-white login-btn rounded-1'
                                style={{backgroundColor: "#9F5CCC"}}
                                onClick={signin}
                                type="submit"
                                >
                                    Login
                            </button>
                            <button className='border-0 mt-3 mb-1 create-new-account'
                                onClick={(e)=>{contextData.setCreateAccountFlag(false); e.preventDefault(); setEmail(""); setPassword("");}}
                            >
                                Create new acccount
                            </button>
                        </>
                        :
                        <>
                            <button className='btn mt-3 text-white login-btn rounded-1'
                            style={{backgroundColor: "#9F5CCC"}}
                            onClick={signUp}
                            type="submit"
                            >
                                Create Account 
                            </button>
                            <button className='border-0 mt-3 mb-1 create-new-account'
                            >
                                Login with existing account
                            </button>
                        </>
                    }
                    
                </form>
            </div>
        </div>
  )
}
