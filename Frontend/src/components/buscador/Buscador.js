import { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomCalendar from "../calendar/CustomCalendar";
import LocationsList from "./LocationsList";
import { useNavigate, createSearchParams } from "react-router-dom";
import "./buscador.css";

const Buscador = () => {
  const {
    location,
    setLocation,
    setPageNumber,
    setLoading,
    setCardCategory,
    setloadingFnChange,
    reservaIn,
    setReservaIn,
    reservaOut,
    setReservaOut,
  } = useStateContext();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const localDateOptions = {
    month: "long",
    day: "numeric",
  };
  const navigate = useNavigate();

  useEffect(() => {
    let cI = localStorage.getItem("checkIn");
    let cO = localStorage.getItem("checkOut");
    if (cI !== null && cO !== null) {
      setCheckIn(cI);
      setCheckOut(cO);
    }
  }, []);

  const handleBuscar = () => {
    if (location === "" && checkIn === "" && checkOut === "") {
      return;
    } else if (location !== "" && reservaIn === "" && reservaOut === "") {
      navigate({
        pathname: "/buscar",
        search: `?${createSearchParams({
          nombreCiudad: location,
        })}`,
      });
    } else if (location === "" && checkIn !== "" && checkOut !== "") {
      navigate({
        pathname: "/buscar",
        search: `?${createSearchParams({
          fechaInicial: reservaIn,
          fechaFinal: reservaOut,
        })}`,
      });
    } else {
      navigate({
        pathname: "/buscar",
        search: `?${createSearchParams({
          nombreCiudad: location,
          fechaInicial: reservaIn,
          fechaFinal: reservaOut,
        })}`,
      });
    }
    setPageNumber(0);
    setCardCategory("");
    setloadingFnChange(true);
    setLoading(true);
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
      setReservaIn(
        date[0].getFullYear() +
          "-" +
          ("0" + (date[0].getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date[0].getDate()).slice(-2)
      );
      setReservaOut(
        date[1].getFullYear() +
          "-" +
          ("0" + (date[1].getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date[1].getDate()).slice(-2)
      );
      setCheckIn(date[0].toLocaleString(undefined, localDateOptions));
      setCheckOut(date[1].toLocaleString(undefined, localDateOptions));
      localStorage.setItem(
        "checkIn",
        date[0].toLocaleString(undefined, localDateOptions)
      );
      localStorage.setItem(
        "checkOut",
        date[1].toLocaleString(undefined, localDateOptions)
      );
    } else if (checkIn !== "") {
      return;
    } else {
      setCheckIn("");
      setCheckOut("");
    }
  };

  return (
    <>
      <div role="search" className="container-buscador-main">
        <h2>Busca ofertas en hoteles, casas y mucho más</h2>
        <div className="container-buscador-inputs">
          <div role="button" className="buscador-select" onClick={handleClick}>
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
          <div role="button" className="buscador-date" onClick={handleClick}>
            <i className="fa-solid fa-calendar-day"></i>
            <p>
              {checkIn !== ""
                ? `${checkIn} - ${checkOut}`
                : `Check in - Check out`}
            </p>
            {openCalendar && (
              <CustomCalendar
                role="calendar"
                handleCheckInOut={handleCheckInOut}
              />
            )}
          </div>
          <button onClick={handleBuscar} className="buscador-button">
            Buscar
          </button>
        </div>
      </div>
    </>
  );
};

export default Buscador;
