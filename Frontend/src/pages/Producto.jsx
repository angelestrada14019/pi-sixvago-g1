import { useParams } from "react-router-dom";
import { useState } from "react";
import HeaderProducto from "../components/heading/Heading";
import ImageGallerry from "../components/imageGallery/ImageGallerry";
import Descripcion from "../components/product/Descripcion";
import Caracteristicas from "../components/product/Caracteristicas";
import Politicas from "../components/product/Politicas";
import GoogleMapC from "../components/product/GoogleMapC";
import "./producto.css";
import FechasDisponibles from "../components/product/FechasDisponibles";
import LocationData from "../components/heading/LocationData";

const Producto = () => {
  let { id } = useParams();
    const [producto] = useState([]);

  return (
    <>
      <HeaderProducto id={id} />
      <div className="containerProducto">
        <ImageGallerry id={id} />
        <Descripcion id={id} />
        <Caracteristicas id={id} />
        <Politicas id={id} />
        <FechasDisponibles />
        <div className= "maps"> 
        <h2>¿Donde vas a estar?</h2>
        <GoogleMapC />
        </div>
      </div>
    </>
  );
};

export default Producto;
