import "./buscador.css";

const Buscador = () => {
  return (
    <div className="container-buscador-main">
      <h2>Busca ofertas en hoteles, casas y mucho más</h2>
      <div className="container-buscador-inputs">
        <div className="buscador-select">
          <i class="fa-solid fa-location-dot"></i>
          <p>¿A dónde vamos?</p>
        </div>
        <div className="buscador-date">
          <i class="fa-solid fa-calendar-day"></i>
          <p>Check in - Check out</p>
        </div>
        {/* <input
          className="buscador-select"
          type="text"
          placeholder="¿A dónde vamos?"
          readOnly
        />
        <input
          className="buscador-date"
          type="text"
          placeholder="Check in - Check out"
          readOnly
        /> */}
        <button className="buscador-button">Buscar</button>
      </div>
    </div>
  );
};

export default Buscador;
