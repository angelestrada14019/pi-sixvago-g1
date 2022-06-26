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
    dateReserva,
    setDateReserva,
  } = useStateContext();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let reserva = JSON.parse(localStorage.getItem("reserva"));
    if (reserva !== null) {
      setCheckIn(reserva.shortDateIn);
      setCheckOut(reserva.shortDateOut);
      setDateReserva(reserva)
    }
  }, []);

  const handleBuscar = () => {
    if (location === "" && checkIn === "" && checkOut === "") {
      return;
    } else if (
      location !== "" &&
      dateReserva.queryInicial === "" &&
      dateReserva.queryFinal === ""
    ) {
      navigate({
        pathname: "/buscar",
        search: `?${createSearchParams({
          nombreCiudad: location,
        })}`,
      });
    } else if (
      location === "" &&
      dateReserva.queryInicial !== "" &&
      dateReserva.queryFinal !== ""
    ) {
      navigate({
        pathname: "/buscar",
        search: `?${createSearchParams({
          fechaInicial: dateReserva.queryInicial,
          fechaFinal: dateReserva.queryFinal,
        })}`,
      });
    } else {
      navigate({
        pathname: "/buscar",
        search: `?${createSearchParams({
          nombreCiudad: location,
          fechaInicial: dateReserva.queryInicial,
          fechaFinal: dateReserva.queryFinal,
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
      setCheckIn(dateReserva.shortDateIn);
      setCheckOut(dateReserva.shortDateOut);
      localStorage.setItem("reserva", JSON.stringify(dateReserva));
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
