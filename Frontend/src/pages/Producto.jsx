import React from "react";
import { useParams } from "react-router-dom";
import CalendarAvailableDay from "../components/calendarAvailableDay/CalendarAvailableDay";
import HeaderProducto from "../components/headerProducto/HeaderProducto";
import ImageGallerry from "../components/imageGallery/ImageGallerry";
import Descripcion from "../components/product/Descripcion";
import Caracteristicas from "../components/product/Caracteristicas";
import './producto.css'
import GoogleMap from "../components/product/GoogleMap.js"

const Producto = () => {
  let { id } = useParams();
  return (
    <div >
      
        <HeaderProducto id={id} />
        <div className="containerProducto">
            <ImageGallerry/>
            <Descripcion/>
            <Caracteristicas/>
            <CalendarAvailableDay/>
            <GoogleMap/>
            
        </div>
    </div>
  );
};

export default Producto;
