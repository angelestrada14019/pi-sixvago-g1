import { useParams } from "react-router-dom";
import HeaderProducto from "../components/heading/Heading";
import ImageGallerry from "../components/imageGallery/ImageGallerry";
import Descripcion from "../components/product/Descripcion";
import Caracteristicas from "../components/product/Caracteristicas";
import Politicas from "../components/product/Politicas";
import GoogleMapC from "../components/product/GoogleMapC";
import "./producto.css";
import FechasDisponibles from "../components/product/FechasDisponibles";

const Producto = () => {
  let { id } = useParams();

  return (
    <>
      <HeaderProducto id={id} />
      <div className="containerProducto">
        <ImageGallerry id={id} />
        <Descripcion id={id} />
        <Caracteristicas id={id} />
        <Politicas id={id} />
        <FechasDisponibles />
        {/* <GoogleMapC /> */}
      </div>
    </>
  );
};

export default Producto;
