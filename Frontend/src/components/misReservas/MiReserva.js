import { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";
import ImageGallerry from "../imageGallery/ImageGallerry";
import "./miReserva.css";

const MiReserva = () => {
  const [misReservas, setMisReservas] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    getMisReservas();
  }, []);

  const getMisReservas = async () => {
    const response = await ApiCall.invokeGET(`/reservas/usuario?id=${user.id}`);
    setMisReservas(response.body);
  };

  return (
    <div className="container-miReserva">
      {misReservas.length > 0 ? (
        misReservas.map((reserva, i) => (
          <div key={i} className="card-miReserva">
            <img
              className="img-miReserva"
              src={reserva.productosProductos.listadeimagenes[0].urlImagen}
              alt=""
            />
            <div className="datos-miReserva">
              <div className="nombre-miReserva">
                {" "}
                <h2>Nombre: {`${user.nombre} ${user.apellido}`}</h2>{" "}
              </div>
              <hr />
              <div className="informacion-miReserva">
                <p>
                  Categoria: {reserva.productosProductos.categorias_id.titulo}
                </p>
                <p>Nombre lugar: {reserva.productosProductos.nombre}</p>
                <p>
                  N° Habitaciones reservadas:{" "}
                  {reserva.productosProductos.habitaciones}
                </p>
              </div>
              <hr />
              <div className="check-miReserva">
                <h3>Check in: {reserva.fechaInicialReserva}</h3>
                <h3>Check out: {reserva.fechaFinalReserva}</h3>
              </div>
              <hr />
              <div className="covid-miReserva">
                <p>Hora de reserva: {reserva.horaComienzoReserva}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-reservas">
          <h1>No tienes reservas</h1>
        </div>
      )}
    </div>
  );
};

export default MiReserva;
