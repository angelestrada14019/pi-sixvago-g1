import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const { setMustLogin } = useContext(AuthContext);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    if (!token) {
      setMustLogin(true);
    }
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
