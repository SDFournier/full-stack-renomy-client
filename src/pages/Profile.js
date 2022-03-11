import React, { useEffect, useState, useContext } from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
const [username, setUsername] = useState("");
const [listOfPosts, setListOfPosts] = useState([]);
const {authState } = useContext(AuthContext);
let {id} = useParams();
let navigate = useNavigate();


useEffect(() =>{
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
    .then((response)=> {
        setUsername(response.data.username)

    })    

    axios.get(`http://localhost:3001/posts/byuserId/${id}`)
    .then((response)=> {				
        
      setListOfPosts(response.data);
    })  
},[]);

  return (
    <div className="profilePageContainer">
        <div className="basicInfo">
            <h1>Username:{username}</h1>
            {authState.username === username && (
              <button onClick={() => {navigate('/changepassword');
            }}>  Cambio De Contraseña</button>
            )}
        </div>
        <div className="listOfPosts">
        {listOfPosts.map((value, key) =>{
                return (
                  
                  
                  <div className="post" key={key} >
                    
                    <div className="title">{value.title}</div>
                    
                    <div className="body" onClick={() => {navigate(`/post/${value.id}`);}}>
                      {value.postText}
                    </div>
                    
                    <div className="footer">
                      <div className="userName" >
                        {value.username}
                      </div>
                      <div className="buttons">
                      
                        
                      <label>{value.Likes.length}</label>
                      </div>
                    </div>
                  </div>
                  
                  
                 
                );
            })}
        </div>
    </div>
  )
}

export default Profile