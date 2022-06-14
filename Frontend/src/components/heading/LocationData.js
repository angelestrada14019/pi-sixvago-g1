import React from 'react'

const LocationData = ({producto}) => {
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
          <p>Muy bueno</p>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        <h2 className="hotel-score">8</h2>
      </div>
    </div>
  );
}

export default LocationData