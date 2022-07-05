import "./politicas.css";

const Politicas = ({ producto }) => {
  console.log("producto", producto);
  return (
    <div className="politicas">
      <h2 className="politicas-title">Que tenes que saber</h2>
      <hr></hr>
      {producto.politicas?.length > 0 ? (
        <div className="politicas-container">
          <div className="politicasSection">
            <h3 className="subsection-title">Normas</h3>
            <ul>
              {producto.politicas.tipoDePolitica === 1 && (
                <li className="lista">{}</li>
              )}
            </ul>
          </div>
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
