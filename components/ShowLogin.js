import "./ShowLogin.css";
import Login from './login.jsx'
import Register from "./register";

export const ShowLogin = ({ show }) => {
  return (
    <div className={`box ${show ? "show" : null}`} id="box-1">
      <Login />
    </div>
  );
};
