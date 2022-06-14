import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";
import LocationData from "./LocationData";
import "./heading.css";

const HeaderProducto = ({ id }) => {
  const [producto, setProducto] = useState([]);
  const { setLoading } = useStateContext();
  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    // console.log("headerProducto" + productoObtenido.nombre);
    setProducto(productoObtenido);
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
          <Link
            to="/"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
          >
            <button className="backButton">
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </Link>
        </div>
      </section>

      {currentLocation.indexOf("/reserva") === -1 && (
        <LocationData producto={producto} />
      )}

      {/* <div className="locationData">
        <i className="fa-solid fa-location-dot"></i>
        <div className="hotelData">
          {producto.ciudades_id !== undefined && (
            <p>
              {producto.ciudades_id.nombre + " " + producto.ciudades_id.pais}
            </p>
          )}
          <p className="mapReport">{producto.direccion}</p>
        </div>
        <div className="ratingContainer">
          <div className="hotel-rating">
            <p>Muy bueno</p>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <h2 className="hotel-score">8</h2>
        </div>
      </div> */}
    </div>
  );
};

export default HeaderProducto;
