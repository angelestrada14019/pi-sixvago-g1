import "./cardReservaExitosa.css"
import { Link } from "react-router-dom";

const CardReservaExitosa = () => {
    return (
        <div className="card-reservaExitosa">
            <div className="icon-successful">
                <i className="fa-solid fa-building-circle-check fa-bounce"></i>
            </div>
            <h1 className="titulo-exitoso">¡Muchas Gracias!</h1>
            <p className="subtitulo-exitoso">
                Su reserva se ha realizado con exito.
            </p>
            <Link  to={"/"}>
            <button className="boton-succes"> Volver al menu</button>
            </Link>
        </div>
    )
}
export default CardReservaExitosa;