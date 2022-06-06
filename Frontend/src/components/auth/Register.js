import { Alert, Snackbar } from "@mui/material";
import React from "react";
import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      input: {
        username: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      errors: {},
      success: false,
      showPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePasswordVisibility = this.handlePasswordVisibility.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      localStorage.setItem("user", JSON.stringify(this.state.input));
      let input = {};
      input["username"] = "";
      input["lastname"] = "";
      input["email"] = "";
      input["password"] = "";
      input["confirm_password"] = "";
      this.setState({ input: input });
      this.setState({ success: true });
      setTimeout(() => {
        this.props.setOpenSignUp(false);
        this.props.setOpenLogin(true);
      }, 2000);
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    const re = /^[a-z ,.'-]+$/i;
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (input["username"] === "") {
      isValid = false;
      errors["username"] = "Por favor ingresa tu nombre.";
    } else {
      if (input["username"].length < 2 || !re.test(input["username"])) {
        isValid = false;
        errors["username"] = "Por favor ingresa un nombre valido.";
      }
    }

    if (input["lastname"] === "") {
      isValid = false;
      errors["lastname"] = "Por favor ingresa tu apellido.";
    } else {
      if (input["lastname"].length < 2 || !re.test(input["lastname"])) {
        isValid = false;
        errors["lastname"] = "Por favor ingresa un apellido valido.";
      }
    }

    if (input["email"] === "") {
      isValid = false;
      errors["email"] = "Por favor ingresa tu email.";
    } else if (!pattern.test(input["email"])) {
      isValid = false;
      errors["email"] = "Por favor ingresa un email valido.";
    }

    if (input["password"] === "") {
      isValid = false;
      errors["password"] = "Por favor ingresa tu contraseña.";
    } else {
      if (input["password"].length < 6) {
        isValid = false;
        errors["password"] = "La contraseña debe tener al menos 6 caracteres.";
      }
    }

    if (input["confirm_password"] === "") {
      isValid = false;
      errors["confirm_password"] = "Por favor confirma tu contraseña.";
    } else {
      if (input["password"] !== input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Las contraseñas no coinciden.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      this.setState({ success: false });
      return;
    }
    this.setState({ success: false });
  }

  handlePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  render() {
    return (
      <div
        className={`register-container ${this.props.show ? "show" : null}`}
        id="register-container"
      >
        {this.state.success === true ? (
          <Snackbar
            sx={{ marginBottom: "4rem" }}
            open={this.state.success}
            autoHideDuration={6000}
            onClose={this.handleClose}
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

        <form
          role="form"
          className="formulario-signup"
          onSubmit={this.handleSubmit}
        >
          <h1>Crear cuenta</h1>
          <div className="nombre-apellido">
            <div>
              <label htmlFor="username">Nombre</label>
              <input
                type="text"
                name="username"
                value={this.state.input.username}
                onChange={this.handleChange}
                placeholder="Ingrese su nombre"
                id="username"
              />
              <div className="text-danger">{this.state.errors.username}</div>
            </div>
            <div>
              <label htmlFor="lastname">Apellido</label>
              <input
                type="text"
                name="lastname"
                value={this.state.input.lastname}
                onChange={this.handleChange}
                placeholder="ingrese su apellido"
                id="lastname"
              />
              <div className="text-danger">{this.state.errors.lastname}</div>
            </div>
          </div>
          <div className="otros-datos">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={this.state.input.email}
                onChange={this.handleChange}
                placeholder="Ingrese su email"
                id="email"
              />
              <div className="text-danger">{this.state.errors.email}</div>
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <p>
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  value={this.state.input.password}
                  onChange={this.handleChange}
                  placeholder="Ingrese su contraseña"
                  id="password"
                />
                <i
                  className="fa-solid fa-eye"
                  onClick={() => this.handlePasswordVisibility()}
                ></i>
              </p>
              <div className="text-danger">{this.state.errors.password}</div>
            </div>
            <div>
              <label htmlFor="confirm_password">Confirme su contraseña</label>
              <input
                type="password"
                name="confirm_password"
                value={this.state.input.confirm_password}
                onChange={this.handleChange}
                placeholder="Confirme su contraseña"
                id="confirm_password"
              />
              <div className="text-danger">
                {this.state.errors.confirm_password}
              </div>
            </div>
          </div>
          <div className="boton">
            <button id="boton-signup" type="submit">
              Crear cuenta
            </button>
          </div>
          <p>
            Ya tienes una cuenta?{" "}
            <span
              id="iniciar"
              className="redireccionReg"
              onClick={this.props.handleClick}
            >
              Inicia sesion
            </span>
          </p>
        </form>
      </div>
    );
  }
}
export default Register;
