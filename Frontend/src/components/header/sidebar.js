import React from "react";
import "./sidebar.css";
import UserWelcome from "./UserWelcome";

const Sidebar = ({
  show,
  handleClick,
  toggleNavButton,
  close,
  isLoggedIn,
  handleLogout,
}) => {
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
