import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate} from "react-router-dom";

function Registration() {

    const initialValues = {
        username: "",
        password: "",
        username: "",
    };
    let navigate = useNavigate();

    
    const validationSchema = Yup.object().shape({      
	username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(3).max(15).required()    

    })

    const onSubmit = (data) =>{
        axios.post("http://localhost:3001/auth", data)
        .then(() =>{
            console.log(data);
            navigate("/");
        })
    };



    return (
        <div>
             <Formik initialValues= {initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
               <Form className="formContainer">
                   
                   <label>Username: </label>
                   <ErrorMessage name="username" component="span"/>  
                   <Field 
                   id="inputCreatePost" 
                   name="username" 
                   placeholder="(Ex. John.."
                   />
                   <label>Password: </label>
                   <ErrorMessage name="password" component="span"/>  
                   <Field 
                   id="inputCreatePost" 
                   name="password" 
                   type="password"
                   placeholder="(Ingrese su contraseña.."
                   />
                   <button type="submit"> Register</button>
                   
               </Form>
            </Formik>
        </div>
    )
}

export default Registration
