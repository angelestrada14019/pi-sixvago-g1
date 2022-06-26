import { useParams } from "react-router-dom";
import HeaderProducto from "../components/heading/Heading";
import CustomCalendar from "../components/calendar/CustomCalendar";
import "./reserva.css";
import Formulario from "../components/booking_form/Formulario";
import HorarioLlegada from "../components/booking_form/HorarioLlegada";
import product from "../components/product/Politicas";
import Politicas from "../components/product/Politicas";
import FormularioReserva from "../components/booking_form/FormularioReserva";

const Reserva = () => {
  let { id } = useParams();
  return (
    <div className="reserva-container">
      <HeaderProducto id={id} />
      <div className="contenedor_columnas">
        <div className="columna_izquierda">
          <Formulario />
          <CustomCalendar />
          <h2 className="section-h2">Tu horario de llegada</h2>
          <HorarioLlegada />
        </div>
        <div className="columna_derecha">
          <FormularioReserva id={id} />
        </div>
      </div>
      <Politicas id={id} />
    </div>
  );
};

export default Reserva;
