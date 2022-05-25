import "./header.css";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import { useEffect, useState } from "react";
import Login from "../login/Login";
import Register from "../login/Register";
import Sidebar from "./sidebar";
import UserWelcome from "./UserWelcome";

const Header = () => {
  const [toggleNavButton, setToggleNavButton] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (openLogin || openSignUp) {
      document.body.style.overflow = "hidden";
    } else if (!openLogin || !openSignUp) {
      document.body.style.overflow = "auto";
    }
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, [openLogin, openSignUp, isLoggedIn]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

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
          <a href="">
            <img src={logo} alt="logo" />
          </a>
          <h1>
            <a href="">Sixvago</a>
          </h1>
        </div>
        <nav>
          {toggleNavButton === "crear" && !isLoggedIn ? (
            <div>
              <p className="boton-nav" id="iniciar" onClick={handleClick}>
                Iniciar sesion
              </p>
            </div>
          ) : toggleNavButton === "iniciar" && !isLoggedIn ? (
            <div>
              <p className="boton-nav" id="crear" onClick={handleClick}>
                Crear cuenta
              </p>
            </div>
          ) : !isLoggedIn ? (
            <>
              <div>
                <p className="boton-nav" id="iniciar" onClick={handleClick}>
                  Iniciar sesion
                </p>
              </div>
              <div>
                <p className="boton-nav" id="crear" onClick={handleClick}>
                  Crear cuenta
                </p>
              </div>
            </>
          ) : !isLoggedIn ? null : (
            <UserWelcome handleLogout={handleLogout} />
          )}
          <div className="menu-hamburger">
            <img
              className="hamburguesa"
              id="responsive-nav"
              onClick={toggleSidebar}
              src={menu}
              alt="menu"
            />
          </div>
        </nav>
      </header>
      <Login
        show={openLogin}
        setOpenLogin={setOpenLogin}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Register show={openSignUp} />
      <Sidebar
        show={showSidebar}
        handleClick={handleClick}
        toggleNavButton={toggleNavButton}
        close={toggleSidebar}
      />
    </>
  );
};

export default Header;
