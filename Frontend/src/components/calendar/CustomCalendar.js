import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import ApiCall from "../../utils/ApiCall";
import useWindowDimensions from "../../utils/useWindowDimensions";
import "./calendar.css";
//import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ handleCheckInOut }) => {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const { dateReserva, setDateReserva } = useStateContext();
  const { width } = useWindowDimensions();
  const { pathname: currentLocation } = useLocation();
  const { id } = useParams();
   const localDateOptions = {
     month: "long",
     day: "numeric",
   };

  useEffect(() => {
    if (id) {
      getDates();
    }
  }, [currentLocation]);

  const getDates = async () => {
    const unavailableDates = await ApiCall.invokeGET(
      `/reservas/productos?idproducto=${id}`
    );
    console.log("unavailableDates", unavailableDates);
    let arrayOfDates = unavailableDates.body.map((day) => {
      return getDaysArray(day.fechaInicialReserva, day.fechaFinalReserva);
    });
    setValue(Array.from(arrayOfDates.flat()));
  };

  const getDaysArray = function (start, end) {
    let arr = new Array();
    let dt = new Date(start.replace(/-/g, "/"));
    while (dt <= new Date(end.replace(/-/g, "/"))) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const handleChange = (date) => {
    setDate(date);
    setDateReserva({
      date: date,
      longDateIn: date[0],
      longDateOut: date[1],
      queryInicial:
        date[0].getFullYear() +
        "-" +
        ("0" + (date[0].getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date[0].getDate()).slice(-2),
      queryFinal:
        date[1].getFullYear() +
        "-" +
        ("0" + (date[1].getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date[1].getDate()).slice(-2),
      shortDateIn: date[0].toLocaleString(undefined, localDateOptions),
      shortDateOut: date[1].toLocaleString(undefined, localDateOptions),
    });
  };

  return (
    <div
      className={`calendar-container ${
        currentLocation === "/" || currentLocation.indexOf("buscar") !== -1
          ? "absolute"
          : "none" && currentLocation === `/producto/${id}`
          ? "none product"
          : "none"
      } `}
    >
      <Calendar
        showDoubleView={width >= 600}
        selectRange={currentLocation !== `/producto/${id}` ? true : false}
        minDetail="month"
        formatShortWeekday={(locale, date) => date.toString().charAt(0)}
        navigationLabel={({ label }) =>
          label.split(" ")[0].charAt(0).toUpperCase() +
          label.split(" ")[0].substring(1)
        }
        minDate={new Date()}
        value={dateReserva?.date?.length > 0 ? dateReserva.date : null}
        next2Label={null}
        prev2Label={null}
        nextLabel={<i className="fa-solid fa-angle-right"></i>}
        prevLabel={<i className="fa-solid fa-angle-left"></i>}
        onChange={handleChange}
        tileDisabled={
          currentLocation.indexOf(`producto`) === -1
            ? () => false
            : ({ date, view }) =>
                view === "month" && // Block day tiles only
                value?.some(
                  (disabledDate) =>
                    date.getFullYear() === disabledDate.getFullYear() &&
                    date.getMonth() === disabledDate.getMonth() &&
                    date.getDate() === disabledDate.getDate()
                )
        }
      />
      {currentLocation.indexOf(`producto`) !== -1 ? null : (
        <button
          className="calendar-button-aplicar"
          onClick={() => handleCheckInOut(date)}
        >
          Aplicar
        </button>
      )}
    </div>
  );
};

export default CustomCalendar;
