import { Alert, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import "./register.css";
import AuthContext from "../../contexts/AuthContext";

const initialInput = {
  nombre: "",
  apellido: "",
  email: "",
  contrasenia: "",
  confirm_contrasenia: "",
};

const Register = ({ show, handleClick, setToggleNavButton }) => {
  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, error, setError } = useContext(AuthContext);

  function handleChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      let user = {
        nombre: input.nombre,
        apellido: input.apellido,
        email: input.email,
        contrasenia: input.contrasenia,
        rol: {
          id: 1,
        },
      };
      setSuccess(true);
      register(user);
      setTimeout(() => {
        setInput(initialInput);
      }, 500);
    }
  }

  function validate() {
    let errors = {};
    let isValid = true;
    const re = /^[a-z ,.'-]+$/i;
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (input["nombre"] === "") {
      isValid = false;
      errors["nombre"] = "Por favor ingresa tu nombre.";
    } else {
      if (input["nombre"].length < 2 || !re.test(input["nombre"])) {
        isValid = false;
        errors["nombre"] = "Por favor ingresa un nombre valido.";
      }
    }

    if (input["apellido"] === "") {
      isValid = false;
      errors["apellido"] = "Por favor ingresa tu apellido.";
    } else {
      if (input["apellido"].length < 2 || !re.test(input["apellido"])) {
        isValid = false;
        errors["apellido"] = "Por favor ingresa un apellido valido.";
      }
    }

    if (input["email"] === "") {
      isValid = false;
      errors["email"] = "Por favor ingresa tu email.";
    } else if (!pattern.test(input["email"])) {
      isValid = false;
      errors["email"] = "Por favor ingresa un email valido.";
    }

    if (input["contrasenia"] === "") {
      isValid = false;
      errors["contrasenia"] = "Por favor ingresa tu contraseña.";
    } else {
      if (input["contrasenia"].length < 6) {
        isValid = false;
        errors["contrasenia"] =
          "La contraseña debe tener al menos 6 caracteres.";
      }
    }

    if (input["confirm_contrasenia"] === "") {
      isValid = false;
      errors["confirm_contrasenia"] = "Por favor confirma tu contraseña.";
    } else {
      if (input["contrasenia"] !== input["confirm_contrasenia"]) {
        isValid = false;
        errors["confirm_contrasenia"] = "Las contraseñas no coinciden.";
      }
    }

    setErrors(errors);

    return isValid;
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      setSuccess(false);
      setError(false);
      return;
    }
    setSuccess(false);
    setError(false);
  }

  function handlePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div
      className={`register-container ${show ? "show" : null}`}
      id="register-container"
    >
      {success === true ? (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
          open={success}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="filled"
            sx={{ marginBottom: "10px" }}
          >
            Registro exitoso. Puedes iniciar sesion.
          </Alert>
        </Snackbar>
      ) : null}
      {!error ? null : (
        <Snackbar
          sx={{ marginBottom: "4rem" }}
          open={error}
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
            Lamentablemente no ha podido registrarse. Por favor intente más
            tarde.
          </Alert>
        </Snackbar>
      )}
      <form role="form" className="formulario-signup" onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
        <div className="nombre-apellido">
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={input.nombre}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
              id="nombre"
            />
            <div className="text-danger">{errors.nombre}</div>
          </div>
          <div>
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={input.apellido}
              onChange={handleChange}
              placeholder="ingrese su apellido"
              id="apellido"
            />
            <div className="text-danger">{errors.apellido}</div>
          </div>
        </div>
        <div className="otros-datos">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Ingrese su email"
              id="email"
            />
            <div className="text-danger">{errors.email}</div>
          </div>
          <div>
            <label htmlFor="contrasenia">Contraseña</label>
            <p>
              <input
                type={showPassword ? "text" : "password"}
                name="contrasenia"
                value={input.contrasenia}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                id="contrasenia"
              />
              <i
                className="fa-solid fa-eye"
                onClick={() => handlePasswordVisibility()}
              ></i>
            </p>
            <div className="text-danger">{errors.password}</div>
          </div>
          <div>
            <label htmlFor="confirm_contrasenia">Confirme su contraseña</label>
            <input
              type="password"
              name="confirm_contrasenia"
              value={input.confirm_contrasenia}
              onChange={handleChange}
              placeholder="Confirme su contraseña"
              id="confirm_contrasenia"
            />
            <div className="text-danger">{errors.confirm_contrasenia}</div>
          </div>
        </div>
        <div className="boton">
          <button id="boton-signup" type="submit">
            Crear cuenta
          </button>
        </div>
        <p>
          Ya tienes una cuenta?{" "}
          <span id="iniciar" className="redireccionReg" onClick={handleClick}>
            Inicia sesion
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
