import React from 'react';
import "./sidebar.css"

const Sidebar = ({ show, handleClick, toggleNavButton, close }) => {
    //toggleSidebar
    console.log(show);
    return (
        <div className={show ? "sidebar active" : "sidebar"}>
            <div className="exit">
                <div>
                    <i className="fas fa-times" onClick={close}></i>
                </div>
            </div>
            <div className="sidebar-header">
                <h3>
                    Menú
                </h3>
            </div>
            <div className="sidebar-body">
                {toggleNavButton === "crear" ? (
                        <ul>
                            <li id='iniciar' onClick={(e) => handleClick(e)}>
                                <a href="#">
                                    <span>Iniciar sesion</span>
                                </a>
                            </li>
                        </ul>
                ) : toggleNavButton === "iniciar" ? (
                    <>
                    <ul>
                        <li id='crear' onClick={(e) => handleClick(e)}>
                            <a href="#">
                                <span>Crear cuenta</span>
                            </a>
                        </li>
                    </ul>
                    </>
                ) : (
                    <>
                    <ul>
                    <li id='crear' onClick={(e)=>handleClick(e)}>
                        <a href="#">
                            <span>Crear cuenta</span>
                        </a>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li id='iniciar' onClick={(e)=>handleClick(e)}>
                        <a href="#">
                            <span>Iniciar sesion</span>
                        </a>
                    </li>
                </ul>
                </>
                )}
            </div>
        </div>

    )
}
export default Sidebar;