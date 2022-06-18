import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./login.css";
import { useStateContext } from "../../contexts/ContextProvider";

const Login = ({ show, setOpenLogin, handleClick }) => {
  const [inputType, setInputType] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [info, setInfo] = useState(false);
  const { mustLogin, setMustLogin } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"));

    if (e.target.userEmail.value === "" || e.target.userPassword.value === "") {
      // alerta de campos vacios
      setInfo(true);
    } else if (
      user.email === e.target.userEmail.value &&
      user.password === e.target.userPassword.value
    ) {
      setOpenLogin(false);
      localStorage.setItem("isLoggedIn", true);
    } else if (
      user.email !== e.target.userEmail.value ||
      user.password !== e.target.userPassword.value
    ) {
      // alerta de malas credenciales
      setAlert(true);
    } else if (
      e.target.userEmail.value !== "" &&
      e.target.userPassword.value !== ""
    ) {
      setError(true);
    } 
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setError(false);
      setInfo(false);
      setAlert(false);
      setMustLogin(false);
      return;
    }
    setError(false);
    setInfo(false);
    setAlert(false);
    setMustLogin(false);
  };

  return (
    <div
      className={`login-container ${show ? "show" : null}`}
      id="login-container"
    >
      {!mustLogin ? null : (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
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
      {!error ? null : (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
          open={error}
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
            Ups! Parece que el usuario no existe. Por favor, verifica tus datos.
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
            severity="warning"
            variant="outlined"
            sx={{
              marginBottom: "10px",
              background: "#262626",
              fontWeight: "bold",
              color: "#d07f08",
              padding: "10px 20px",
            }}
          >
            Por favor vuelva a intentarlo, sus credenciales son inválidas.
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
