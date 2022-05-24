import React from "react";
import "./login.css"
import { useState } from "react";
const Login = () => {
    return (
        <form className="formulario-login">
            <h1>Iniciar sesion</h1>
            <div className="otros-datos">
                <div>
                    <label>Correo electronico</label>
                    <input 
                        type = "email"
                        placeholder = "Ingrese su correo electronico"
                        />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
            </div>
            <div className="boton">
            <button id="boton-login" type="submit">Ingresar</button>
            </div>
            <p>Aun no tienes una cuenta? <a href="">Registrate aqui</a></p>
        </form>
    )
}
export default Login;