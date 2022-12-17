import React from 'react';
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import NavBar from '../NavBar/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="display-1 text-center d-flex justify-content-center min-vh-100 min-vw-100 mt-5">
          Welcome on Board!
      </div>
    </>
  )
}
