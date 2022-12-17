import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import { useEffect, useState } from "react";
import Login from "./Components/Login/Login";
import { GlobalContext } from "./Utils/context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Profile from "./Components/Profile/Profile";


function App() {
  const [loginFlag, setLoginFlag] = useState(true);
  const [createAccountFlag, setCreateAccountFlag] = useState(true);
 // const nav = useNavigate();

  useEffect(()=>{
      if(localStorage.getItem('email') && localStorage.getItem('password'))
      {
        setCreateAccountFlag(false);
        setLoginFlag(false);
      }

  }, [])
  

  return (
    <GlobalContext.Provider
      value={{
        setLoginFlag,
        createAccountFlag,
        setCreateAccountFlag
      }}
    >

        
    
      
      {
        loginFlag ?
          <Login />
        :
        <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/profile"} element={<Profile />} />
          </Routes>
      </BrowserRouter>
      }
      
      
    </GlobalContext.Provider>
  );
}

export default App;
