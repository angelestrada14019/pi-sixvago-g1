import { useParams } from "react-router-dom";
import HeaderProducto from "../components/heading/Heading";
import CustomCalendar from "../components/calendar/CustomCalendar";
import "./reserva.css";

const Reserva = () => {
  let { id } = useParams();
  return (
    <div className="reserva-container">
      <HeaderProducto id={id} />
      <CustomCalendar />
    </div>
  );
};

export default Reserva;
