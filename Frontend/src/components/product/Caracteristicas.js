import { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";
import "./caracteristicas.css";

const Caracteristicas = ({ id }) => {
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    setProducto(productoObtenido.body);
  };

  return (
    <div className="caracteristicas">
      <h2 className="caracteristicas-title">¿Que ofrece este lugar?</h2>
      <hr></hr>
      <div className="caracteristicas-container">
        {producto.caracteristicas !== undefined &&
          producto.caracteristicas.map((caracteristica, index) => {
            return (
              <div key={index} className="caracteristica">
                <i className={`${caracteristica.icono} icono`}></i>
                <span className="nombre">{caracteristica.nombre}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Caracteristicas;
