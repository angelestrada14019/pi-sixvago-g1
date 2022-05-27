import { useState } from "react";
import "./login.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Login = ({ show, setOpenLogin, handleClick }) => {
  const [inputType, setInputType] = useState(false);
  const [alert, setAlert] = useState(false);
  const [info, setInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (
        user.email === e.target.userEmail.value &&
        user.password === e.target.userPassword.value
      ) {
        setOpenLogin(false);
        localStorage.setItem("isLoggedIn", true);
      } else {
        // alerta de malas credenciales
        setInfo(true);
      }
    } else {
      // por aca no pasa si ya hay un item en el localstorage
      setAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setInfo(false);
      setAlert(false);
      return;
    }
    setInfo(false);
    setAlert(false);
  };

  return (
    <div
      className={`login-container ${show ? "show" : null}`}
      id="login-container"
    >
      {!alert ? null : (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="warning"
            variant="filled"
            sx={{ marginBottom: "10px" }}
          >
            Ups! Parece que el usuario no existe. Por favor, verifica tus datos.
          </Alert>
        </Snackbar>
      )}
      {!info ? null : (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
          open={info}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="info" variant="filled" sx={{ marginBottom: "10px" }}>
            Por favor vuelva a intentarlo, sus credenciales son inválidas.
          </Alert>
        </Snackbar>
      )}
      <form className="formulario-login" onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <div className="otros-datos">
          <div>
            <label>Correo electronico</label>
            <input
              type="email"
              id="userEmail"
              placeholder="Ingrese su correo electronico"
            />
          </div>
          <div>
            <label>Contraseña</label>
            <p id="eyes-input">
              <input
                type={inputType ? "text" : "password"}
                id="userPassword"
                placeholder="Ingrese su contraseña"
              />
              <i
                className="fa-solid fa-eye"
                onClick={() => setInputType(!inputType)}
              ></i>
            </p>
          </div>
        </div>
        <div className="boton">
          <button id="boton-login" type="submit">
            Ingresar
          </button>
        </div>
        <p>
          Aun no tienes una cuenta?{" "}
          <span id="crear" className="redireccionLogin" onClick={handleClick}>
            Registrate aqui
          </span>
        </p>
      </form>
    </div>
  );
};
export default Login;
