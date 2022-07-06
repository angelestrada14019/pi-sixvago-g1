import UserWelcome from "./UserWelcome";
import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = ({
  show,
  handleClick,
  toggleNavButton,
  close,
  handleLogout,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { pathname: currentLocation } = useLocation();
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
  }, []);

  return (
    <div className={show ? "sidebar active" : "sidebar"}>
      <div className="exit">
        <div>
          <i className="fas fa-times" onClick={close}></i>
        </div>
      </div>
      <div className="sidebar-header">
        {!isLoggedIn ? (
          <h3>Menú</h3>
        ) : (
          <div className="user-welcome-media">
            <UserWelcome />
          </div>
        )}
      </div>
      <div className="sidebar-body">
        {!isLoggedIn ? (
          <div>
            {toggleNavButton === "crear" ? (
              <ul>
                <li id="iniciar" onClick={(e) => handleClick(e)}>
                  <a href="#">
                    <span className="boton-iniciar">Iniciar sesion</span>
                  </a>
                </li>
              </ul>
            ) : toggleNavButton === "iniciar" ? (
              <>
                <ul>
                  <li id="crear" onClick={(e) => handleClick(e)}>
                    <a href="#">
                      <span className="boton-crear">Crear cuenta</span>
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul>
                  <li id="crear" onClick={(e) => handleClick(e)}>
                    <a href="#">
                      <span className="boton-crear">Crear cuenta</span>
                    </a>
                  </li>
                </ul>
                <hr />
                <ul>
                  <li id="iniciar" onClick={(e) => handleClick(e)}>
                    <a href="#">
                      <span className="boton-iniciar">Iniciar sesion</span>
                    </a>
                  </li>
                </ul>
              </>
            )}
          </div>
        ) : null}
        {!isLoggedIn ? null : isLoggedIn &&
          user.rol.id === 2 &&
          !currentLocation.includes("administracion") ? (
          <div className="sidebar-administracion">
            <h2 onClick={handleClick} id="administracion">
              Administracion
            </h2>
          </div>
        ) : null}
        {isLoggedIn && !currentLocation.includes("mireserva") ? (
          <div className="sidebar-mis-reservas">
            <p
              id="reservas"
              onClick={handleClick}
            >
              Mis reservas
            </p>
          </div>
        ) : null}
        {!isLoggedIn ? null : (
          <div className="exit-sesion">
            <p>
              ¿Deseas <span onClick={handleLogout}>cerrar sesión</span>?
            </p>
          </div>
        )}
      </div>
      <hr />
      <div className="sidebar-footer">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-linkedin-in"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
      </div>
    </div>
  );
};
export default Sidebar;
