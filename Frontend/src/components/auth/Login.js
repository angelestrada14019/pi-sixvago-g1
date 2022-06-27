import { useContext, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./login.css";
import AuthContext from "../../contexts/AuthContext";

const Login = ({ show, handleClick }) => {
  const [inputType, setInputType] = useState(false);
  const [info, setInfo] = useState(false);
  const {
    login,
    mustLogin,
    setMustLogin,
    setOpenLogin,
    error,
    setError,
    alert,
    setAlert,
  } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.userEmail.value === "" || e.target.userPassword.value === "") {
      // alerta de campos vacios
      setInfo(true);
    } else if (
      e.target.userEmail.value !== "" &&
      e.target.userPassword.value !== ""
    ) {
      let usr = {
        email: e.target.userEmail.value,
        contrasenia: e.target.userPassword.value,
      };
      login(usr);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setMustLogin(false);
      setInfo(false);
      setAlert(false);
      return;
    }
    setMustLogin(false);
    setInfo(false);
    setAlert(false);
  };

  return (
    <div
      className={`login-container ${show ? "show" : null}`}
      id="login-container"
    >
      {!mustLogin ? null : (
        <Snackbar
          open={mustLogin}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="warning"
            variant="outlined"
            sx={{
              marginTop: "95px",
              background: "#262626",
              fontWeight: "bold",
              color: "#d07f08",
              padding: "10px 20px",
            }}
          >
            Debes loggearte para realizar una reserva.
          </Alert>
        </Snackbar>
      )}
      {!alert ? null : (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="error"
            variant="outlined"
            sx={{
              marginBottom: "10px",
              background: "#262626",
              fontWeight: "bold",
              color: "#da4f4c",
              padding: "10px 20px",
            }}
          >
            Lamentablemente no ha podido iniciar sesión. Por favor intente más
            tarde.
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
          <Alert
            severity="info"
            variant="outlined"
            sx={{
              marginBottom: "10px",
              background: "#262626",
              fontWeight: "bold",
              color: "#0c8dc7",
              padding: "10px 20px",
            }}
          >
            Los campos no pueden estar vacios.
          </Alert>
        </Snackbar>
      )}
      <form role="form" className="formulario-login" onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <div className="otros-datos">
          <div>
            <label htmlFor="userEmail">Correo electronico</label>
            <input
              type="email"
              id="userEmail"
              placeholder="Ingrese su correo electronico"
            />
          </div>
          <div>
            <label htmlFor="userPassword">Contraseña</label>
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
