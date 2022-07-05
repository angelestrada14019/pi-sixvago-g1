import "./politicas.css";
import React, { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";
const Politicas = ({ producto }) => {
  const [tiposPolitica, setTiposPolitica] = useState([]);
  useEffect(() => {
    getTiposDePoliticas();
  }, []);
  const getTiposDePoliticas = () => {
    const response = ApiCall.invokeGET(`/tipoDePoliticas`);
    try {
      if (response.ok) {
        setTiposPolitica(response.body);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="politicas">
      <h2 className="politicas-title">Que tenes que saber</h2>
      <hr></hr>
      {producto.politicas?.length > 0 ? (
        <div className="politicas-container">
          {tiposPolitica?.map((tipoPolitica, i) => (
            <div className="politicasSection">
              <h3 className="subsection-title">{tipoPolitica.nombre}</h3>
              <ul>
                {producto.politicas?.map(
                  (politica, i) =>
                    politica.tipoDePolitica.id === tipoPolitica.id && (
                      <li className="lista">{}</li>
                    )
                )}
                {producto.politicas.tipoDePolitica === 1 && (
                  <li className="lista">{}</li>
                )}
              </ul>
            </div>
          ))}

          <div className="politicasSection">
            <h3 className="subsection-title">Seguridad</h3>
            <ul>
              <li className="lista">
                {producto.politicas_servicio !== undefined &&
                  producto.politicas_servicio.split(",")[6]}
              </li>
            </ul>
          </div>
          <div className="politicasSection">
            <h3 className="subsection-title">Cancelacion</h3>
            <ul>
              <li className="lista">
                {producto.politicas_servicio !== undefined &&
                  producto.politicas_servicio.split(",")[11]}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>No hay politicas</p>
      )}
    </div>
  );
};

export default Politicas;
