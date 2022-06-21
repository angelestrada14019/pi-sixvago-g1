import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CustomCalendar from "../calendar/CustomCalendar";
import "./fechasDisponibles.css";

const FechasDisponibles = () => {
  const { setMustLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (JSON.parse(localStorage.getItem("token"))) {
      navigate("reserva");
    } else {
      navigate({ pathname: "/login", replace: true });
      setTimeout(() => {
        setMustLogin(true);
      }, 500);
    }
  };

  return (
    <div className="calendarAvailableDay">
      <h2>Fechas Disponibles</h2>
      <div>
        <div className="calendarAvailableDay_container">
          <CustomCalendar />
          <div className="calendarAvailableDay_boxReservation">
            <p>Agregá tus fechas de viaje para obtener precios exactos</p>
            <button onClick={handleClick}>Reservar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FechasDisponibles;
