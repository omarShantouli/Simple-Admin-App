import React from "react";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import { useContext } from "react";
import { GlobalContext } from "../../Utils/context";
import "../NavBar/NavBar.scss";




export default function NavBar() {
  const contextData = useContext(GlobalContext);
     

  return (
    <>
      <div className="d-flex navBar min-vw-100">
        <div className="text-white d-flex align-items-center justify-content-center h2">
          React Auth
        </div>
          <button
            className="d-flex align-items-center justify-content-center h-100 border-0 text-white h6 pt-3 pb-3 ms-auto"
            style={{ backgroundColor: "#2E0259" }}
            onClick={() => {
              contextData.setCreateAccountFlag(true);
            }}
          >
            Login
          </button>
      </div>
    </>
  );
}
