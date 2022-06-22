import { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";
import "./politicas.css";

const Politicas = ({ id }) => {
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    // console.log(
    //   "headerProducto" +
    //     productoObtenido.caracteristicas.map((item) => item.nombre)
    // );
    setProducto(productoObtenido.body);
  };

  return (
    <div className="politicas">
      <h2 className="politicas-title">Que tenes que saber</h2>
      <hr></hr>
      <div className="politicas-container">
        <div className="normasCasa politicasSection">
          <h3 className="subsection-title">
            {producto.politicas_servicio !== undefined &&
              producto.politicas_servicio.split(",")[0]}
          </h3>
          <ul>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[1]}
            </li>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[2]}
            </li>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[3]}
            </li>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[4]}
            </li>
          </ul>
        </div>
        <div className="saludYSeguridad politicasSection">
          <h3 className="subsection-title">
            {producto.politicas_servicio !== undefined &&
              producto.politicas_servicio.split(",")[5]}
          </h3>
          <ul>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[6]}
            </li>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[7]}
            </li>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[8]}
            </li>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[9]}
            </li>
          </ul>
        </div>
        <div className="cancelacion politicasSection">
          <h3 className="subsection-title">
            {producto.politicas_servicio !== undefined &&
              producto.politicas_servicio.split(",")[10]}
          </h3>
          <ul>
            <li className="lista">
              {producto.politicas_servicio !== undefined &&
                producto.politicas_servicio.split(",")[11]}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Politicas;
