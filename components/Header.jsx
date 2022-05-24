import "../components/Header.css";
import logo from "../assets/logo 1.svg";
import menu from "../assets/menu.svg"
import { useEffect, useState } from "react";
import { ShowLogin } from "./ShowLogin";
import { ShowRegister } from "./ShowRegister";

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
          <img src={logo} />
          <h1>Digital booking</h1>
        </div>
        <div className="menu-hamburger"><img className="hamburguesa" id="responsive-nav" onClick={handleClick} src={menu}/></div>
        <nav>
          {toggleNavButton === "crear" ? (
            <div>
              <p className="boton-nav" id="iniciar" onClick={handleClick}>Iniciar sesion</p>
            </div>
          ) : toggleNavButton === "iniciar" ? (
            <div>
              <p className="boton-nav" id="crear" onClick={handleClick}>Crear cuenta</p>
            </div>
          ) : (
            <>
              <div>
                <p className="boton-nav" id="iniciar" onClick={handleClick}>Iniciar sesion</p>
              </div>
              <div>
                <p className="boton-nav" id="crear" href="crear" onClick={handleClick}>Crear cuenta</p>
              </div>
            </>
          )}
        </nav>
      </header>
      <ShowLogin show={openLogin} />
      <ShowRegister show={openSignUp}/>
    </>
  );
};

export default Header;
