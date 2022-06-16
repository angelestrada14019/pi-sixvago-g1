import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import CardReservaExitosa from "../components/cards/CardReservaExitosa";
import "./ReservaExitosa.css";

const ReservaExitosa = () => {
  return (
    <div className="reservaExitosa">
      <CardReservaExitosa />
    </div>
  );
};
export default ReservaExitosa;
