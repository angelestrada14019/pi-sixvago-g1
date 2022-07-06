import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { setMustLogin, validateToken } = useContext(AuthContext);
  const { pathname } = useLocation();
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  } else if (pathname === "/administracion" && user.rol.id !== 2) {
    return <Navigate to="/" replace />;
  } else if (pathname !== "/administracion") {
    if (!validateToken()) {
      setMustLogin(true);
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
