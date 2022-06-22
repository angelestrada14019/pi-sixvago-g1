import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { setMustLogin, validateToken } = useContext(AuthContext);

  useEffect(() => {
    if (!validateToken()) {
      setMustLogin(true);
    }
  }, []);

  if (!validateToken()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
