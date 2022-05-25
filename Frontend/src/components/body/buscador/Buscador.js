import { useEffect, useState } from "react";
import "./buscador.css";
import CustomCalendar from "./CustomCalendar";
import LocationsList from "./LocationsList";

const Buscador = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [location, setLocation] = useState("");
  const localDateOptions = {
    month: "long",
    day: "numeric",
  };

  const handleClick = (e) => {
    if (e.target.className === "buscador-date") {
      setOpenCalendar(!openCalendar);
      setOpenLocations(false);
    }
    if (e.target.className === "calendar-button-aplicar")
      setOpenCalendar(!openCalendar);
    if (e.target.className === "buscador-select") {
      setOpenLocations(!openLocations);
      setOpenCalendar(false);
    }
  };

  const handleCheckInOut = (date) => {
    if (date[0]) {
      setCheckIn(date[0].toLocaleDateString(undefined, localDateOptions));
      setCheckOut(date[1].toLocaleDateString(undefined, localDateOptions));
    } else if (checkIn !== "") {
      return;
    } else {
      setCheckIn("");
      setCheckOut("");
    }
  };

  return (
    <>
      <div className="container-buscador-main">
        <h2>Busca ofertas en hoteles, casas y mucho más</h2>
        <div className="container-buscador-inputs">
          <div className="buscador-select" onClick={handleClick}>
            <i className="fa-solid fa-location-dot"></i>
            <p>{!location ? "¿A dónde vamos?" : `${location}`}</p>
            {!openLocations ? null : (
              <div className="buscador-select-options">
                <LocationsList
                  setLocation={setLocation}
                  setOpenLocations={setOpenLocations}
                />
              </div>
            )}
          </div>
          <div className="buscador-date" onClick={handleClick}>
            <i className="fa-solid fa-calendar-day"></i>
            <p>
              {checkIn !== ""
                ? `${checkIn} - ${checkOut}`
                : `Check in - Check out`}
            </p>
            {openCalendar && (
              <CustomCalendar
                className="custom-calendar"
                handleCheckInOut={handleCheckInOut}
              />
            )}
          </div>
          <button className="buscador-button">Buscar</button>
        </div>
      </div>
    </>
  );
};

export default Buscador;
