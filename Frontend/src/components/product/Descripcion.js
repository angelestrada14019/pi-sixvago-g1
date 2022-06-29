import "./descripcion.css";

const Descripcion = ({ producto }) => {
  return (
    <div className="descripcion-text">
      <h2 className="titleDescription">{producto.nombre}</h2>
      <p className="descriptionP">{producto.descripcion}</p>
    </div>
  );
};

export default Descripcion;