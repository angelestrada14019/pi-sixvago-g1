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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (openLogin || openSignUp) {
      document.body.style.overflow = "hidden";
    } else if (!openLogin || !openSignUp) {
      document.body.style.overflow = "auto";
    }
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, [openLogin, openSignUp, isLoggedIn]);

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

  const handleLogout = () => {
    setToggleNavButton("");
    setOpenLogin(false);
    setOpenSignUp(false);
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
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
          {toggleNavButton === "crear" && !isLoggedIn ? (
            <div className="boton-nav" id="iniciar" onClick={handleClick}>
              <p>Iniciar sesion</p>
            </div>
          ) : toggleNavButton === "iniciar" && !isLoggedIn ? (
            <div className="boton-nav" id="crear" onClick={handleClick}>
              <p>Crear cuenta</p>
            </div>
          ) : !isLoggedIn ? (
            <>
              <div className="boton-nav" id="iniciar" onClick={handleClick}>
                <p>Iniciar sesion</p>
              </div>
              <div className="boton-nav" id="crear" onClick={handleClick}>
                <p>Crear cuenta</p>
              </div>
            </>
          ) : !isLoggedIn ? null : (
            <div className="user-loggedIn-main-container">
              <div className="user-avatar-container">
                <h2>
                  {`
                ${JSON.parse(localStorage.getItem("user")).username.slice(0, 1)}
                ${JSON.parse(localStorage.getItem("user")).lastname.slice(0, 1)}
                `}
                </h2>
              </div>
              <div className="user-welcome-container">
                <li type="none">
                  <ul>
                    <p>Hola, </p>
                  </ul>
                  <ul className="user-welcome-username">
                    <p>{`
                    ${JSON.parse(localStorage.getItem("user")).username}
                    ${JSON.parse(localStorage.getItem("user")).lastname}        
                    `}</p>
                  </ul>
                </li>
                <div className="user-logout-container" onClick={handleLogout}>
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      <Login
        show={openLogin}
        setOpenLogin={setOpenLogin}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Register show={openSignUp} />
    </>
  );
};

export default Header;
