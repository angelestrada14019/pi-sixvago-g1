import { useState,useEffect } from "react";
import "./buscador.css";
import CustomCalendar from "./CustomCalendar";
import LocationsList from "./LocationsList";
import { useStateContext } from "../../../contexts/ContextProvider";
const Buscador = () => {
    const {location ,setLocation,setList,product,setCardCategory,cardCategory,setPageNumber} = useStateContext();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
    useEffect(() => {
       let cI= localStorage.getItem("checkIn") 
        let cO=localStorage.getItem("checkOut")
        if (cI!==null && cO!==null){
            setCheckIn(cI);
            setCheckOut(cO);
        }
        
    }, []);
  const localDateOptions = {
    month: "long",
    day: "numeric",
  };

  const handleBuscar =()=>{
        setList(filtroBuscar(product))
        setPageNumber(0);
  }
  const filtroBuscar =(array)=>{
        let filtro = array.filter(item=>{
            return item.location.toLowerCase().includes(location.toLowerCase());
        }); // en vez de esto se puede usar un queryParams para hacer la consulta por fetch
        return filtro;
  }


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
      localStorage.setItem("checkIn", date[0].toLocaleDateString(undefined, localDateOptions));
        localStorage.setItem("checkOut", date[1].toLocaleDateString(undefined, localDateOptions));
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
                className="custom-calendar"
                handleCheckInOut={handleCheckInOut}
              />
            )}
          </div>
          <button onClick={handleBuscar} className="buscador-button">Buscar</button>
        </div>
      </div>
    </>
  );
};

export default Buscador;
