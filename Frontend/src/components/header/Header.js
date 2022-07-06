import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Sidebar from "./sidebar";
import UserWelcome from "./UserWelcome";
import logo from "../../assets/SixVago-dorado.png";
import menu from "../../assets/menu.png";
import AuthContext from "../../contexts/AuthContext";
import "./header.css";
import Adminisracion from "../../pages/Administracion";

const Header = () => {
  const [toggleNavButton, setToggleNavButton] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    setCardCategory,
    setLocation,
    setLoading,
    setLoadingFiltro,
    setloadingFnChange,
  } = useStateContext();
  const { isLoggedIn, openSignUp, openLogin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname: currentLocation } = useLocation();
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
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
  }, [openLogin, openSignUp, isLoggedIn]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClick = (e) => {
    const { id } = e.target;
    if (id === "crear") {
      navigate("/signUp");
      setShowSidebar(false);
    }
    if (id === "iniciar") {
      navigate("/login");
      setShowSidebar(false);
    }
    if (id === "reservas") {
      navigate(`user/${user.id}/mireserva`);
      setShowSidebar(false);
    }
    if (id === "administracion") {
      navigate("/administracion");
      setShowSidebar(false);
    }
    setCardCategory("");
    setLocation("");
  };

  const handleLogout = () => {
    logout();
    setToggleNavButton("");
    setCardCategory("");
    setLocation("");
  };

  return (
    <>
      <header>
        <div className="logo">
          <Link
            to="/"
            onClick={() => {
              navigate("/");
              setToggleNavButton("");
              setCardCategory("");
              setLocation("");
              setLoadingFiltro(true);
              setLoading(true);
              setloadingFnChange(true);
            }}
          >
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav>
          {!isLoggedIn ? null : isLoggedIn &&
            user.rol.id === 2 &&
            !currentLocation.includes("administracion") ? (
            <div className="administracion">
              <h2 onClick={handleClick} id="administracion">
                Administracion
              </h2>
            </div>
          ) : null}
          {isLoggedIn && !currentLocation.includes("mireserva") ? (
            <div className="mis-reservas">
              <p
                role="button"
                className="boton-nav"
                id="reservas"
                onClick={handleClick}
              >
                Mis reservas
              </p>
            </div>
          ) : null}
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
          ) : (
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
      <Login show={openLogin} handleClick={handleClick} />
      <Register
        show={openSignUp}
        handleClick={handleClick}
        setToggleNavButton={setToggleNavButton}
      />
      <Sidebar
        show={showSidebar}
        handleClick={handleClick}
        toggleNavButton={toggleNavButton}
        close={toggleSidebar}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;
