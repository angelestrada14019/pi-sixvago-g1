import "./politicas.css";
import React, { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";
const Politicas = ({ producto }) => {
  const [tiposPolitica, setTiposPolitica] = useState([]);
  useEffect(() => {
    getTiposDePoliticas();
  }, []);
  const getTiposDePoliticas = async() => {
    const response =await ApiCall.invokeGET(`/tipoDePoliticas`);
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
    
        <div className="politicas-container">
          {tiposPolitica?.map((tipoPolitica, i) => (
            <div key={`${tipoPolitica.nombre}`} className="politicasSection">
              <h3 className="subsection-title">{tipoPolitica.nombre}</h3>
              <ul>
                {producto.politicas?.map(
                  (politica, i) =>
                    politica.tipoDePolitica.id === tipoPolitica.id && (
                      <li key={`${tipoPolitica.nombre}${politica.descripcion}`} className="lista">{politica.descripcion}</li>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>
     
    </div>
  );
};

export default Politicas;
