import "../components/Header.css";
import logo from "../assets/logo.png";
import { useState } from "react";

const Header = () => {
  const [toggleNavButton, setToggleNavButton] = useState("");

  const handleClick = (e) => {
    if (e.target.id === "crear") {
      setToggleNavButton("crear");
    }
    if (e.target.id === "iniciar") {
      setToggleNavButton("iniciar");
    }
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} />
        <h1>Digital booking</h1>
      </div>
      <nav>
        {toggleNavButton === "crear" ? (
          <div className="boton-nav" id="iniciar" onClick={handleClick}>
            <p>Iniciar sesion</p>
          </div>
        ) : toggleNavButton === "iniciar" ? (
          <div className="boton-nav" id="crear" onClick={handleClick}>
            <p>Crear cuenta</p>
          </div>
        ) : (
          <>
            <div className="boton-nav" id="iniciar" onClick={handleClick}>
              <p>Iniciar sesion</p>
            </div>
            <div className="boton-nav" id="crear" onClick={handleClick}>
              <p>Crear cuenta</p>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
