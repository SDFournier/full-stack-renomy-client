import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  

  const [authState, SetAuthState] = useState({username: "", id: 0, status:false}); 


  const logout = () => {
    localStorage.removeItem("accessToken");
    SetAuthState({username: "", id: 0, status: false});   
    
  }


  useEffect(() =>{
    axios.get("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) =>{
      
    
      if(response.data.error){
        SetAuthState({...authState, status: false});
        
      } else {
        SetAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }

  })
}, []);


  return (
    <div className="App">
      <AuthContext.Provider value={{authState, SetAuthState}}>
      <Router>
        <div className="navbar">
          <div className="links">
          {!authState.status ?(
          <>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
          </>
        ) : (
          <>
          <Link to="/"> Home Page</Link>
          <Link to="/createPost"> Create A Post</Link>
          </>
        )}
          </div>
          <div className="loggedInContainer">
          <h1>{authState.username}</h1>
          {authState.status && <button onClick={logout}>Logout</button>}
          </div>
          
        
        
        </div>
        
        <Routes>
          <Route path="/" exact element={<Home/>}  />
          <Route path="/createpost" exact element={<CreatePost/>} />
          <Route path="/post/:id" exact element={<Post/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/changepassword" exact element={<ChangePassword/>}/>
          <Route path="/registration" exact element={<Registration/>}/>
          <Route path="/profile/:id" exact element={<Profile/>}/>
          
          <Route path="*"  exact element={<PageNotFound/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
      

      
    </div>
  );
}

export default App;
