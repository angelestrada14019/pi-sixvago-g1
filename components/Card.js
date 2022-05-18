import React from "react";

const Card = ({ data }) => {
  return (
    <div className="card">
      <img className="card-img" src={`${data.img}`} alt={data.title} />
      <div className="card-body">
        {/* categoría del producto, el nombre, ubicación, la descripción. Y un botón */}
        <p className="card-category">{`${data.category.toUpperCase()}`}</p>
        <h2 className="card-title">{`${data.title}`}</h2>
        <p className="card-location">{`${data.location}`}</p>
        <p className="card-description">{`${data.description.slice(0, 100).concat(" mas...")}`}</p>
        <button className="card-button">Ver más</button>
      </div>
    </div>
  );
};

export default Card;
