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
      id: user.id,
      nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    contrasenia: user.contrasenia,
    ciudad: user.ciudad,
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
  const handleClick =async(e)=>{           
        console.log("values", values);
        console.log("usuario", usuario);
        const okR= await postReserva(values);
        const okU=await putUsuario(usuario);
        if (okR && okU) {
            navigate(`reservaExitosa`)
        } else {
            console.log("alerta")
            alert("no se creo la reserva")
         e.preventDefault();
        }
   
  }

  const postReserva= async(body)=>{
    try{
    const response = await ApiCall.invokePOST(`/reservas`,body);
    return response.ok
    }catch(error){
        return false
    }
  }
  const putUsuario = async(body)=>{
    try {
        
        const response = await ApiCall.invokePUT(`/usuarios`,body);
        return response.ok
    } catch (error) {
        return false
    }
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
