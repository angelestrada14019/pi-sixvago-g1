import Stars from "../stars/Stars";
import useAvgScore from "../stars/useAvgScore";

const LocationData = ({ producto }) => {
  const { avScore, avValue } = useAvgScore({
    producto,
    id: producto?.productos_id,
  });
  return (
    <div className="locationData">
      <i className="fa-solid fa-location-dot"></i>
      <div className="hotelData">
        {producto.ciudades_id !== undefined && (
          <p>{producto.ciudades_id.nombre + " " + producto.ciudades_id.pais}</p>
        )}
        <p className="mapReport">{producto.direccion}</p>
      </div>
      <div className="ratingContainer">
        <div className="hotel-rating">
          <p>{avValue}</p>
          <Stars data={producto} />
        </div>
        <h2 className="hotel-score">{avScore}</h2>
      </div>
    </div>
  );
};

export default LocationData;
