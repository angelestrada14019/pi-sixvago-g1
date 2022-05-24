import "./header.css";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import { useEffect, useState } from "react";
import Login from "../login/Login";
import Register from "../login/Register";

const Header = () => {
  const [toggleNavButton, setToggleNavButton] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    if (openLogin || openSignUp) {
      document.body.style.overflow = "hidden";
    } else if (!openLogin || !openSignUp) {
      document.body.style.overflow = "auto";
    }
  }, [openLogin, openSignUp]);

  const handleClick = (e) => {
    if (e.target.id === "crear") {
      setToggleNavButton("crear");
      setOpenLogin(false);
      setOpenSignUp(true);
    }
    if (e.target.id === "iniciar") {
      setToggleNavButton("iniciar");
      setOpenLogin(true);
      setOpenSignUp(false);
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>Sixvago</h1>
        </div>
        <div className="menu-hamburger">
          <img
            className="hamburguesa"
            id="responsive-nav"
            onClick={handleClick}
            src={menu}
            alt="menu"
          />
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
      <Login show={openLogin} setOpenLogin={setOpenLogin} />
      <Register show={openSignUp} />
    </>
  );
};

export default Header;
