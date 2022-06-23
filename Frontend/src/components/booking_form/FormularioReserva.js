import React, { useEffect, useState, useLocation } from "react";
import CustomCalendar from "../calendar/CustomCalendar";
import ImagenesProd from "../product/ImagenesProd";
import ApiCall from "../../utils/ApiCall";
import "./FormularioReserva.css";
import { useNavigate } from "react-router-dom";

const FormularioReserva = ({ id }) => {
    const navigate =useNavigate();
  const [producto, setProducto] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  
  
  const [hora,setHora]=useState("");
  const [values, setValues] = useState({
    horaComienzoReserva: "",
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
    email: user.email,
    id: user.id,
    nombre: user.nombre,
    rol: {
      id: user.rol.id,
    },
  });

  useEffect(() => {
    console.log(producto);
    
    getProducto();
  }, [values,usuario]);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    console.log(productoObtenido);
    setProducto(productoObtenido.body);
  };
  const onChange = (e) => {
    const horaP = localStorage.getItem("horarioReserva");
    const ciudad = localStorage.getItem("ciudadReserva");
    setValues({
      ...values,
      horaComienzoReserva:horaP,
      [e.target.name]: e.target.value,
    });
    setUsuario({
        ...usuario,
      ciudad:ciudad,
    })
    
    
  };
  const handleClick =(e)=>{           
        console.log("values", values);
        console.log("usuario", usuario);
        const okR=postReserva(values);
        const okU=postReserva(usuario);
        if (okR && okU) {
            navigate(`reservaExitosa`)
        } else {
            console.log("alerta")
         e.preventDefault();
        }
   
  }

  const postReserva= async(body)=>{
    const response = await ApiCall.invokePOST(`/reservas`,body);
    return response.ok
  }
  const putUsuario = async(body)=>{
    const response = await ApiCall.invokePUT(`/reservas`,body);
    return response.ok
  }

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
        <button onClick={handleClick} type="submit">Reservar</button>
      </div>
    </div>
  );
};
export default FormularioReserva;
