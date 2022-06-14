import { useParams } from "react-router-dom";
import HeaderProducto from "../components/heading/Heading";
import "./reserva.css";

const Reserva = () => {
  let { id } = useParams();
  return (
    <div className="reserva-container">
      <HeaderProducto id={id} />
    </div>
  );
};

export default Reserva;
