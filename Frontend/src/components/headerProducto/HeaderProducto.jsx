import React from "react";
import "./headerProducto.css";

const HeaderProducto = ({ id }) => {
  return (
    <div className="headerProducto">
      <section className="lodging-section">
        <div className="descriptionLodging">
          <div className="section">
            <h4>Hotel</h4>
            <h2>Hermitage Hotel</h2>
          </div>
          <a href="/">
            <button className="backButton">
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </a>
        </div>
      </section>

      <div className="locationData">
        <i className="fa-solid fa-location-dot"></i>
        <div className="hotelData">
          Buenos Aires, Ciudad Autónoma de Buenos Aires, Argentina
          <p className="mapReport">A 940m del centro</p>
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
    </div>
  );
};

export default HeaderProducto;
