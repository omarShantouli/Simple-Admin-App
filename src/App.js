import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import { useEffect, useState } from "react";
import Login from "./Components/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Components/Profile/Profile";
import { GlobalContext } from "./Utils/context";


function App() {
  const [loginFlag, setLoginFlag] = useState(true);
  const [createAccountFlag, setCreateAccountFlag] = useState(true);

  useEffect(()=>{
      if(localStorage.getItem('email') && localStorage.getItem('password'))
    {
      setLoginFlag(false);
      setCreateAccountFlag(false);
    }

  }, [])
  


  return (
    <GlobalContext.Provider
      value={{
        loginFlag,
        setLoginFlag,
        createAccountFlag,
        setCreateAccountFlag
      }}
    >

        <NavBar/>
      
      
      {
        loginFlag ?
        <Login />
        :
        <div className="d-flex align-items-center justify-content-center" style={{minHeight : "100vh", minWidth : "100vh"}}>
          <div>
            <Profile />
          </div>
      </div>
      }
      
    </GlobalContext.Provider>
  );
}

export default App;
