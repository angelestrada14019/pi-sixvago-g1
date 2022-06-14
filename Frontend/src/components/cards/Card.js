import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const handleVerMas = () => {
    navigate(`/producto/${data.productos_id}`);
  };
  return (
    <div className="card">
      <img
        className="card-img"
        src={
          data.categorias_id !== undefined &&
          `${data.listadeimagenes[0].urlImagen}`
        }
        alt={data.categorias_id !== undefined && data.listadeimagenes[0].titulo}
      />
      <div className="card-body">
        {/* categoría del producto, el nombre, ubicación, la descripción. Y un botón */}

        <p className="card-category">
          {data.categorias_id !== undefined &&
            `${data.categorias_id.titulo.toUpperCase()}`}
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </p>
        <div className="card-rating">
          <h2>8</h2>
          <p>Muy bueno</p>
        </div>

        <h2 className="card-title">
          {data.categorias_id !== undefined && `${data.nombre}`}
        </h2>
        <p className="card-location">
          {data.categorias_id !== undefined && `${data.ciudades_id.nombre}`}
        </p>
        <p className="card-description">
          {data.categorias_id !== undefined &&
            `${data.descripcion.slice(0, 100)}`}
          <Link to={`/producto/${data.productos_id}`}>
            <span> mas...</span>
          </Link>
        </p>
        <Link to={`/producto/${data.productos_id}`}>
          <button className="card-button">Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
