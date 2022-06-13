import "./header.css";
import logo from "../../assets/SixVago-dorado.png";
import menu from "../../assets/menu.png";
import { useEffect, useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Sidebar from "./sidebar";
import UserWelcome from "./UserWelcome";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
const Header = () => {
    const navigate = useNavigate();
  const [toggleNavButton, setToggleNavButton] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    setCardCategory,
    cardCategory,
    setLocation,
    setLoading,
    setLoadingFiltro,
    setloadingFnChange
  } = useStateContext();
  useEffect(() => {
    if (openLogin) {
      setToggleNavButton("iniciar");
    }
    if (openSignUp) {
      setToggleNavButton("crear");
    }
    if (openLogin || openSignUp) {
      document.body.style.overflow = "hidden";
    } else if (!openLogin || !openSignUp) {
      document.body.style.overflow = "auto";
    }
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, [openLogin, openSignUp, isLoggedIn]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClick = (e) => {
    if (e.target.id === "crear") {
      //setToggleNavButton("crear");
      setOpenLogin(false);
      setOpenSignUp(true);
      setShowSidebar(false);
    }
    if (e.target.id === "iniciar") {
      //setToggleNavButton("iniciar");
      setOpenLogin(true);
      setOpenSignUp(false);
      setShowSidebar(false);
    }
    setCardCategory("");
    setLocation("");
  };

  const handleLogout = () => {
    setToggleNavButton("");
    setOpenLogin(false);
    setOpenSignUp(false);
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
    setCardCategory("");
    setLocation("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <header>
        <div className="logo">
          <Link
            to="/"
            onClick={() => {
                navigate("/");
              setOpenLogin(false);
              setOpenSignUp(false);
              setToggleNavButton("");
              setCardCategory("");
              setLocation("");
              setLoadingFiltro(true);
              setLoading(true);
              setloadingFnChange(false);
              setTimeout(() => {
                setloadingFnChange(true);
                setLoading(false);
              }, 1100);
            }}
          >
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav>
          {toggleNavButton === "crear" && !isLoggedIn ? (
            <div>
              <p
                role="button"
                className="boton-nav"
                id="iniciar"
                onClick={handleClick}
              >
                Iniciar sesion
              </p>
            </div>
          ) : toggleNavButton === "iniciar" && !isLoggedIn ? (
            <div>
              <p
                role="button"
                className="boton-nav"
                id="crear"
                onClick={handleClick}
              >
                Crear cuenta
              </p>
            </div>
          ) : !isLoggedIn ? (
            <>
              <div>
                <p
                  role="button"
                  className="boton-nav"
                  id="iniciar"
                  onClick={handleClick}
                >
                  Iniciar sesion
                </p>
              </div>
              <div>
                <p
                  role="button"
                  className="boton-nav"
                  id="crear"
                  onClick={handleClick}
                >
                  Crear cuenta
                </p>
              </div>
            </>
          ) : !isLoggedIn ? null : (
            <div className="user-welcome-normal">
              <UserWelcome handleLogout={handleLogout} />
            </div>
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
        setToggleNavButton={setToggleNavButton}
        setIsLoggedIn={setIsLoggedIn}
        handleClick={handleClick}
      />
      <Register
        show={openSignUp}
        handleClick={handleClick}
        setToggleNavButton={setToggleNavButton}
        setOpenLogin={setOpenLogin}
        setOpenSignUp={setOpenSignUp}
      />
      <Sidebar
        show={showSidebar}
        handleClick={handleClick}
        toggleNavButton={toggleNavButton}
        close={toggleSidebar}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;
