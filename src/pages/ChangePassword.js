import React from 'react';
import  {useParams, useNavigate, Link} from 'react-router-dom';
import axios from "axios";
import {useEffect, useState, useContext} from "react";
import { AuthContext } from "../helpers/AuthContext";



function ChangePassword() {
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("")

const changePassword = () => {
  
  axios.put("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/auth/changepassword",
    {oldPassword: oldPassword, newPassword: newPassword,},
    {headers: { accessToken: localStorage.getItem("accessToken")},},
    
  ).then((response)=>{
    console.log(response);
    if(response.data.error){
      alert(response.data.erorr);
    }
  })
}

  return (
    <div>
        <h1>Cambia Tu Contraseña</h1>
        <input type="text" placeholder="Contraseña Vieja..." onChange={(event)=> {setOldPassword(event.target.value);}}/>
        <input type="text" placeholder="Contraseña Nueva..." onChange={(event)=> {setNewPassword(event.target.value);}} />
        <button onClick={changePassword}>Guardar Canmbios</button>
    </div>
  

     );
}

export default ChangePassword;