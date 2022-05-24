import "./ShowLogin.css";
import Login from './login.jsx'
import Register from "./register";

export const ShowRegister = ({ show }) => {
  return (
    <div className={`box ${show ? "show" : null}`} id="box-1">
      <Register />
    </div>
  );
};
