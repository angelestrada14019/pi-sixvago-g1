import { useParams } from "react-router-dom";
import HeaderProducto from "../components/heading/Heading";
import CustomCalendar from "../components/calendar/CustomCalendar";
import Formulario from "../components/booking_form/Formulario";
import HorarioLlegada from "../components/booking_form/HorarioLlegada";
import Politicas from "../components/product/Politicas";
import FormularioReserva from "../components/booking_form/FormularioReserva";
import "./reserva.css";
import { useEffect, useState } from "react";
import ApiCall from "../utils/ApiCall";

const Reserva = () => {
  let { id } = useParams();
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProducto();
    console.log(producto);
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    setProducto(productoObtenido.body);
  };
  return (
    <div className="reserva-container">
      <HeaderProducto producto={producto} />
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
      <Politicas producto={producto} />
    </div>
  );
};

export default Reserva;
