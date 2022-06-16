import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import CardReservaExitosa from "../components/cards/CardReservaExitosa"
import "./ReservaExitosa.css";

const ReservaExitosa = () => {
    let { id } = useParams();
    return (
        <div>
            <Header id={id} />
            <div className="reservaExitosa">
            <CardReservaExitosa/>
            </div>
        </div>
    );
}
export default ReservaExitosa;
