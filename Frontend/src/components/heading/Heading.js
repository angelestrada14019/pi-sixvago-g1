import { useLocation, useNavigate } from "react-router-dom";
import LocationData from "./LocationData";
import "./heading.css";

const HeaderProducto = ({ producto }) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const navigate = useNavigate();

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
