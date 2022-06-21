import { useParams } from "react-router-dom";
import HeaderProducto from "../components/heading/Heading";
import CustomCalendar from "../components/calendar/CustomCalendar";
import "./reserva.css";
import Formulario from "../components/booking_form/Formulario";
import HorarioLlegada from "../components/booking_form/HorarioLlegada";
import product from "../components/product/Politicas"
import Politicas from "../components/product/Politicas";

const Reserva = () => {
  let { id } = useParams();
  return (
    <div className="reserva-container">
      <HeaderProducto id={id} />
      <Formulario/> 
      <CustomCalendar />
      <HorarioLlegada  />
      <Politicas id={id} />
    </div>
  );
};

export default Reserva;
