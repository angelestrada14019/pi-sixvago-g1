import React, { useEffect, useState, useNavigate, useLocation } from 'react';
import CustomCalendar from "../calendar/CustomCalendar";
import ImagenesProd from "../product/ImagenesProd"
import ApiCall from '../../utils/ApiCall';
import "./FormularioReserva.css"

const FormularioReserva = ({ id }) => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    console.log(producto);
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    console.log(productoObtenido);
    setProducto(productoObtenido.body);
  }


  return (
    
    <div className="Form_Reserva">
     <img className="form-img" src={producto?.listadeimagenes[0]?.urlImagen}></img>
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
        <p className='direccion'>{producto?.direccion}</p>
      </div>
      <div className="form_checkin_out">
        <label htmlFor="Check-in">Check-in</label>
        <input
          type="date"
          id="date"
        />
      </div>
      <div className="form_checkin_out">
        <label htmlFor="Check-out">Check-out</label>
        <input
          type="date"
          id="date"
        />
      </div>
      <div className="form_boton">
      <button type="submit">Reservar</button>
         
      </div>
    </div>




  );
}
export default FormularioReserva;
