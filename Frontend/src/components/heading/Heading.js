import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";
import LocationData from "./LocationData";
import "./heading.css";

const HeaderProducto = ({ id }) => {
  const [producto, setProducto] = useState([]);
  const { setLoading } = useStateContext();
  const location = useLocation();
  const currentLocation = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    // console.log("headerProducto" + productoObtenido.nombre);
    setProducto(productoObtenido);
  };

  console.log(currentLocation.indexOf(`/reserva`));

  const handleBack = () => {
    if (currentLocation.indexOf(`/reserva`) === -1) {
      navigate(`/`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="headerProducto">
      <section className="lodging-section">
        <div className="descriptionLodging">
          <div className="section">
            {producto.categorias_id !== undefined && (
              <h4>{producto.categorias_id.titulo}</h4>
            )}

            {producto.categorias_id !== undefined && <h2>{producto.nombre}</h2>}
          </div>
          <button className="backButton" onClick={handleBack}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
      </section>

      {currentLocation.indexOf("/reserva") === -1 && (
        <LocationData producto={producto} />
      )}
    </div>
  );
};

export default HeaderProducto;
