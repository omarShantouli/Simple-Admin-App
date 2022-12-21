import React, { useContext, useEffect, useState } from "react";
import "../Login/Login.scss";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../Utils/Firebase";
import { GlobalContext } from "../../Utils/context";
import LoginNav from "../NavBar/LoginNav";
import Swal from "sweetalert2";

export default function Login() {
  const storedEmail = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "";
  const storedPassword = localStorage.getItem("password")
    ? localStorage.getItem("password")
    : "";
  const [email, setEmail] = useState(storedEmail);
  const [password, setPassword] = useState(storedPassword);
  const auth = getAuth(app);
  const contextData = useContext(GlobalContext);
  const [incorrectPassEmailFlag, setIncorrectPassEmailFlag] = useState(false);
  const [passwordLengthFlag, setPasswordLengthFlag] = useState(false);
  const [alreadyExistFlag, setAlreadyExistFlag] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [contextData.createAccountFlag]);

  useEffect(() => {
    setAlreadyExistFlag(false);
    setIncorrectPassEmailFlag(false);
    setPasswordLengthFlag(false);
  }, [email, password]);

  function signUp() {
    if (!incorrectPassEmailFlag && !passwordLengthFlag && !alreadyExistFlag)
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          contextData.setLoginFlag(false);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Singed up Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          if (password.length < 6) setPasswordLengthFlag(true);
          else if(!email.includes('@') || !email.includes('.com'))
          {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            localStorage.clear();
          }
          else
          setAlreadyExistFlag(true);
        });
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  }

  function signin() {
    if (!incorrectPassEmailFlag && !passwordLengthFlag && !alreadyExistFlag)
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          contextData.setLoginFlag(false);
        })
        .catch(() => {
          if (email !== "" && password !== "") setIncorrectPassEmailFlag(true);
        });

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  }

  return (
    <>
      <LoginNav />
      <div className="container d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center mt-5 text-white p-3 w-25 rounded login">
          {incorrectPassEmailFlag ? (
            <div className="text-center text-danger">
              The email address or password is incorrect. Please retry again...
            </div>
          ) : null}

          {contextData.createAccountFlag ? (
            <div className="h4 mt-4">Login</div>
          ) : (
            <div className="h4 mt-4">Sign Up</div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="d-flex flex-column align-items-center w-100"
          >
            {alreadyExistFlag ? (
              <div className="text-center text-danger">
                Account is already registered… Please login
              </div>
            ) : null}
            <label htmlFor="email" className="mt-3">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-3 w-100 rounded-1 border-0"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            {passwordLengthFlag ? (
              <div className="text-center text-danger">
                Password must be at least 6 characters long
              </div>
            ) : null}
            <label htmlFor="password" className="mt-3">
              Your Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-3 w-100 rounded-1 border-0"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />

            {contextData.createAccountFlag ? (
              <>
                <button
                  className="btn mt-3 text-white login-btn rounded-1"
                  style={{ backgroundColor: "#9F5CCC" }}
                  onClick={signin}
                  type="submit"
                >
                  Login
                </button>
                <button
                  className="border-0 mt-3 mb-1 create-new-account"
                  onClick={(e) => {
                    contextData.setCreateAccountFlag(false);
                    e.preventDefault();
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Create new acccount
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn mt-3 text-white login-btn rounded-1"
                  style={{ backgroundColor: "#9F5CCC" }}
                  onClick={signUp}
                  type="submit"
                >
                  Create Account
                </button>
                <button
                  className="border-0 mt-3 mb-1 create-new-account"
                  onClick={(e) => {
                    contextData.setCreateAccountFlag(true);
                    e.preventDefault();
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Login with existing account
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
