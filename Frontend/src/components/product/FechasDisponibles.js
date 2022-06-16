import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomCalendar from "../calendar/CustomCalendar";
import "./fechasDisponibles.css";

const FechasDisponibles = () => {
  const { setOpenLogin, setMustLogin } = useStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    // cambiar isLoggedIn por token
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      navigate("reserva");
    } else {
      setOpenLogin(true);
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