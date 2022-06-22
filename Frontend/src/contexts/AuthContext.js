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
  const [error, setError] = useState("");
  const { pathname: currentLocation } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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
      console.log(error);
    }
    return isValid;
  };

  const login = async (user) => {
    setError("");
    try {
      const response = await ApiCall.invokePOST(`/auth/login`, user);
      console.log(response);
      if (response.error) {
        setError(response.error);
      } else {
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(response.body.usuarioDto));
        localStorage.setItem("token", JSON.stringify(response.body.token));
      }
    } catch (error) {
      setError(error);
    } finally {
      navigate(-1);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = async (user) => {
    setError("");
    try {
      const response = await ApiCall.invokePOST(`/auth/register`, user);
      if (response.error) {
        setError(response.error);
      }
    } catch (error) {
      setError(error);
    } finally {
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
        error,
        setError,
        login,
        logout,
        register,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
