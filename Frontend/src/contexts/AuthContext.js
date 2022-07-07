import { createContext, useEffect, useState } from "react";
import ApiCall from "../utils/ApiCall";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mustLogin, setMustLogin] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  // este error es para las alertas
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [err, setErr] = useState(null);
  const { pathname: currentLocation } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(validateToken());
    if (currentLocation === "/login") {
      setOpenSignUp(false);
      setOpenLogin(true);
    } else if (currentLocation === "/signUp") {
      setOpenLogin(false);
      setOpenSignUp(true);
    } else {
      setOpenLogin(false);
      setOpenSignUp(false);
    }
  }, [currentLocation]);

  const validateToken = () => {
    let isValid = null;
    const token = localStorage.getItem("token");
    try {
      const decode = jwtDecode(token);
      if (decode.exp < Date.now() / 1000) {
        isValid = false;
        localStorage.removeItem("token");
      } else {
        isValid = true;
      }
    } catch (error) {
      //console.log(error);
    }
    return isValid;
  };

  const login = async (user) => {
      const response = await ApiCall.invokePOST(`/auth/login`, user);
      if (!response.ok) {
        setErr(response.status);
        // activar alerta
        setAlert(true);
      } else {
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(response.body.usuarioDto));
        localStorage.setItem("token", response.body.token);
        navigate(-1)
      }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = async (user) => {
      const response = await ApiCall.invokePOST(`/auth/register`, user);
      if (!response.ok) {
        setErr(response.status);
        // activar alerta
        setError(true);
      } else {
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(response.body.usuarioDto));
        localStorage.setItem("token", response.body.token);
        navigate(-1);
      }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        openLogin,
        setOpenLogin,
        openSignUp,
        setOpenSignUp,
        mustLogin,
        setMustLogin,
        err,
        setErr,
        login,
        logout,
        register,
        validateToken,
        error,
        setError,
        alert,
        setAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
