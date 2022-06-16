import { useNavigate, useParams } from "react-router-dom";
import CalendarAvailableDay from "../components/calendarAvailableDay/CalendarAvailableDay";
import HeaderProducto from "../components/heading/Heading";
import ImageGallerry from "../components/imageGallery/ImageGallerry";
import Descripcion from "../components/product/Descripcion";
import Caracteristicas from "../components/product/Caracteristicas";
import Politicas from "../components/product/Politicas";
import GoogleMapC from "../components/product/GoogleMapC";
import "./producto.css";
import CustomCalendar from "../components/calendar/CustomCalendar";
import { useStateContext } from "../contexts/ContextProvider";

const Producto = () => {
  let { id } = useParams();
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
    <div>
      <HeaderProducto id={id} />
      <div className="containerProducto">
        <ImageGallerry id={id} />
        <Descripcion id={id} />
        <Caracteristicas id={id} />
        <Politicas id={id} />
        <div className="calendarAvailableDay_container">
          <CustomCalendar />
          <div className="calendarAvailableDay_boxReservation">
            <p>Agregá tus fechas de viaje para obtener precios exactos</p>
            <button onClick={handleClick}>Reservar</button>
          </div>
        </div>
        {/* <CalendarAvailableDay /> */}
        {/* <GoogleMapC id ={id}/> */}
      </div>
    </div>
  );
};

export default Producto;
