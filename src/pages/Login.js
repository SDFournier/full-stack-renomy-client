import React, {useState, useContext} from 'react';
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";





function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const {SetAuthState} = useContext(AuthContext);

let navigate = useNavigate();


const login = () => {
    const data= {username: username, password: password};
    axios.post("https://full-stack-app-nod-rea-mys-sdf.herokuapp.com/auth/login", data)
    .then((response) => {
        if (response.data.error) alert(response.data.error);
        else{
        localStorage.setItem("accessToken", response.data.token);
        
        SetAuthState({username: response.data.username, id: response.data.id, status: true});
        
        console.log(response.data);
        navigate("/");
        }
    })
}

    return (
        <div className="loginContainer">
            <label>Username</label>
            <input type="text" onChange={(event) => {setUsername(event.target.value);}}/>
            <label>Password</label>
            <input type="password" onChange={(event) => {setPassword(event.target.value);}}/>
            <button onClick={login}> Login</button>
        </div>
    )
}

export default Login
