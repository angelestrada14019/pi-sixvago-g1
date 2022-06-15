import { useState, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import useWindowDimensions from "../../utils/useWindowDimensions";
import "./calendarAvailableDay.css";

const CalendarAvailableDay = () => {
  const [value, setValue] = useState(null);
  const { setOpenLogin, setMustLogin } = useStateContext();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const dayAvailable = [
    {
      first: new Date("2022-06-005"),
      last: new Date("2022-06-024"),
    },
    {
      first: new Date("2022-06-027"),
      last: new Date("2022-07-004"),
    },
    {
      first: new Date("2022-08-004"),
      last: new Date("2022-08-009"),
    },
    {
      first: new Date("2022-07-006"),
      last: new Date("2022-07-009"),
    },
    {
      first: new Date("2022-07-019"),
      last: new Date("2022-07-031"),
    },
  ];

  useEffect(() => {
    setValue(getDates());
  }, []);

  const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const getDates = () => {
    let calendaryAvailable = dayAvailable.map((day) => {
      return getDatesInRange(day.first, day.last);
    });
    let calendaryAvailable2 = calendaryAvailable.flat();
    return calendaryAvailable2;
  };

  const handleClick = () => {
    // cambiar isLoggedIn por token
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      navigate("reserva");
    } else {
      setOpenLogin(true);
      setTimeout(() => {
        setMustLogin(true);
      }, 500);
    }
  };

  return (
    <div className="calendarAvailableDay">
      <h2>Fechas Disponibles</h2>
      <div>
        <div className="calendarAvailableDay_container">
          <Calendar
            multiple
            value={value}
            minDate={new Date()}
            readOnly
            numberOfMonths={width >= 600 ? 2 : 1}
          />
          <div className="calendarAvailableDay_boxReservation">
            <p>Agregá tus fechas de viaje para obtener precios exactos</p>
            <button onClick={handleClick}>Reservar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarAvailableDay;
