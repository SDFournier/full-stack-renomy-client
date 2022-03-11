import React from 'react'
import {   Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
        <h1>Pagina No Encontrada:/</h1>
        <h3>Pruebe este Link: <Link to="/"> Pagina De Inicio</Link></h3>
    </div>
  )
}

export default PageNotFound