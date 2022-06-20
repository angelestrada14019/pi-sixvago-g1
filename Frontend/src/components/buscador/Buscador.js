import { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomCalendar from "../calendar/CustomCalendar";
import LocationsList from "./LocationsList";
import ApiCall from "../../utils/ApiCall";
import "./buscador.css";
import { useNavigate, createSearchParams } from "react-router-dom";

const Buscador = () => {
  const {
    location,
    setLocation,
    setList,
    setPageNumber,
    setLoading,
    setCardCategory,
    setloadingFnChange,
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
    if (location !== "") {
      navigate({
        pathname: "/buscar",
        search: `?${createSearchParams({
          nombreCiudad: location,
        })}`,
      });
      setPageNumber(0);
      setCardCategory("");
      setloadingFnChange(true);
      setLoading(true);
    }
  };

  // const productosPorCiudad = async () => {
  //   if (searchParams.toString()) {
  //     const filtroQuery = await ApiCall.invokeGET(
  //       `/productos/ciudad?${searchParams.toString()}`
  //     );
  //     setList(filtroQuery);
  //   }
  //   // const filtroQuery = await ApiCall.invokeGET(`/productos/ciudad`, [
  //   //   `nombreCiudad=${location}`,
  //   // ]);
  // };

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
      localStorage.setItem(
        "checkIn",
        date[0].toLocaleDateString(undefined, localDateOptions)
      );
      localStorage.setItem(
        "checkOut",
        date[1].toLocaleDateString(undefined, localDateOptions)
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
