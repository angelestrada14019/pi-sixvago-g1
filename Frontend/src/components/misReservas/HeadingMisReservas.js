import { useLocation, useNavigate } from "react-router-dom";
import "./headingMisReservas.css";

const HeadingMisReservas = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="headerProducto">
      <section className="lodging-section">
        <div className="descriptionLodging">
          <div className="section">
            <h5>Mis Reservas</h5>
          </div>
          <button className="backButton" onClick={handleBack}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeadingMisReservas;
