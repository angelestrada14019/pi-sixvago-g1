import { useEffect, useState } from "react";
import ApiCall from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";
import "./FormularioReserva.css";
import { useStateContext } from "../../contexts/ContextProvider";
import Stars from "../stars/Stars";

const FormularioReserva = ({ id }) => {
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const { setReservaP, reservaP, dateReserva } = useStateContext();
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
    getProducto();
    setUsuario({
      ...usuario,
      ciudad: reservaP.ciudadReserva,
    });
    setValues({
      ...values,
      horaComienzoReserva: reservaP.horarioReserva,
      fechaInicialReserva: dateReserva.queryInicial,
      fechaFinalReserva: dateReserva.queryFinal,
    });
  }, [reservaP]);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    setProducto(productoObtenido.body);
  };
  //   const onChange = (e) => {
  //     setValues({
  //       ...values,
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  const handleClick = async (e) => {
    const okR = await postReserva(values);
    const okU = await putUsuario(usuario);
    if (okR && okU) {
      navigate(`reservaExitosa`);
    } else {
      setAlert(true);
      e.preventDefault();
    }
  };

  const postReserva = async (body) => {
    try {
      const response = await ApiCall.invokePOST(`/reservas`, body);
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  const putUsuario = async (body) => {
    try {
      const response = await ApiCall.invokePUT(`/usuarios`, body);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setAlert(false);
      return;
    }
    setAlert(false);
  };

  return (
    <div className="Form_Reserva">
      {!alert ? null : (
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            variant="outlined"
            sx={{
              marginTop: "150px",
              background: "#262626",
              fontWeight: "bold",
              color: "#c93330",
              padding: "10px 20px",
            }}
          >
            Lamentablemente no se ha podido crear la reserva. Por favor intente
            más tarde.
          </Alert>
        </Snackbar>
      )}
      <img
        className="form-img"
        src={producto?.listadeimagenes[0]?.urlImagen}
        alt={producto?.nombre}
      ></img>
      <div className="form_nombre">
        <h2>{producto?.nombre}</h2>
        <p className="puntuacion_Reserva">
          <Stars data={producto} />
        </p>
      </div>

      <div className="form_direccion">
        <p className="direccion">{producto?.direccion}</p>
      </div>
      <div className="form_checkin_out">
        <label htmlFor="Check-in">Check-in</label>
        <input
          name="fechaInicialReserva"
          type="text"
          id="date"
          value={dateReserva.queryInicial}
          disabled
        />
      </div>
      <div className="form_checkin_out">
        <label htmlFor="Check-out">Check-out</label>
        <input
          name="fechaFinalReserva"
          type="text"
          id="date"
          value={dateReserva.queryFinal}
          disabled
        />
      </div>
      <div className="checkbox-covid">
        <label htmlFor="cbox1">
          <input type="checkbox" name="covid" id="cbox1" value=""></input>¿Tiene
          colocada al menos dos vacunas?
        </label>
      </div>
      <div className="textarea-reserva">
        <label className="title-textarea" htmlFor="textarea-vendedor">
          Informacion para vendedor
        </label>
        <textarea id="textarea-vendedor" name="info para vendedor"></textarea>
      </div>
      <div className="form_boton">
        <button onClick={handleClick} type="submit">
          Reservar
        </button>
      </div>
    </div>
  );
};
export default FormularioReserva;
