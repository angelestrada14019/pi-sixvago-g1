import React, { useEffect, useState, useNavigate, useLocation } from "react";
import CustomCalendar from "../calendar/CustomCalendar";
import ImagenesProd from "../product/ImagenesProd";
import ApiCall from "../../utils/ApiCall";
import "./FormularioReserva.css";

const FormularioReserva = ({ id }) => {
  const [producto, setProducto] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const ciudad = localStorage.getItem("ciudadReserva");
  const hora = localStorage.getItem("horarioReserva");
  const [values, setValues] = useState({
    horaComienzoReserva: hora,
    fechaInicialReserva: "",
    fechaFinalReserva: "",
    vacunaCovid: false,
    datosParaVendedor: "no hay dato en este",
    productosProductos: {
      productos_id: parseInt(id),
    },
    usuarios: {
      id: user.id,
    },
  });
  const [usuario, setUsuario] = useState({
    apellido: user.apellido,
    ciudad: user.ciudad,
    contrasenia: user.contrasenia,
    email: "angel@gmail.com",
    id: 2,
    nombre: "angel",
    rol: {
      id: 1,
      nombre: "cliente",
    },
  });

  useEffect(() => {
    console.log(producto);
    console.log("value", values);
    console.log("user", user);
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    console.log(productoObtenido);
    setProducto(productoObtenido.body);
  };
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="Form_Reserva">
      <img
        className="form-img"
        src={producto?.listadeimagenes[0]?.urlImagen}
      ></img>
      <div className="form_nombre">
        <h2>{producto?.nombre}</h2>
        <p className="puntuacion_Reserva">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </p>
      </div>

      <div className="form_direccion">
        <p className="direccion">{producto?.direccion}</p>
      </div>
      <div className="form_checkin_out">
        <label htmlFor="Check-in">Check-in</label>
        <input
          name="fechaInicialReserva"
          type="date"
          id="date"
          onChange={onChange}
        />
      </div>
      <div className="form_checkin_out">
        <label htmlFor="Check-out">Check-out</label>
        <input
          name="fechaFinalReserva"
          type="date"
          id="date"
          onChange={onChange}
        />
      </div>
      <div className="form_boton">
        <button type="submit">Reservar</button>
      </div>
    </div>
  );
};
export default FormularioReserva;
