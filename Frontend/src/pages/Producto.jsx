import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderProducto from "../components/heading/Heading";
import ImageGallerry from "../components/imageGallery/ImageGallerry";
import Descripcion from "../components/product/Descripcion";
import Caracteristicas from "../components/product/Caracteristicas";
import Politicas from "../components/product/Politicas";
import GoogleMapC from "../components/product/GoogleMapC";
import "./producto.css";
import FechasDisponibles from "../components/product/FechasDisponibles";
import ApiCall from "../utils/ApiCall";

const Producto = () => {
  let { id } = useParams();
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    setProducto(productoObtenido.body);
  };

  return (
    <>
      <HeaderProducto producto={producto} />
      <div className="containerProducto">
        <ImageGallerry id={id} />
        <Descripcion producto={producto} />
        <Caracteristicas producto={producto} />
        <FechasDisponibles />
        <div className="maps">
          <h2>¿Donde vas a estar?</h2>
          {/* <GoogleMapC producto={producto}/> */}
        </div>
        <Politicas producto={producto} />
      </div>
    </>
  );
};

export default Producto;
