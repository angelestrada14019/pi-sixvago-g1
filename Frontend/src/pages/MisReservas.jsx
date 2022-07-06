import React from "react";
import HeadingMisReservas from "../components/misReservas/HeadingMisReservas";
import MiReserva from "../components/misReservas/MiReserva";
import "./misReservas.css";
const MisReservas = () => {
  return (
    <>
      <HeadingMisReservas />
      <div className="miReserva-container">
        <MiReserva />
      </div>
    </>
  );
};

export default MisReservas;
