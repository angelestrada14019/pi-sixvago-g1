import { useState, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";
import { Link } from "react-router-dom";
import "./calendarAvailableDay.css";

const CalendarAvailableDay = () => {
  const [value, setValue] = useState(null);
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

  return (
    <div className="calendarAvailableDay">
      <h2>Fechas Disponibles</h2>
      <div>
        <div className="calendarAvailableDay_container">
          <div className="calendarAvailableDay_container_doubleCalendar">
            <Calendar
              multiple
              value={value}
              minDate={new Date()}
              readOnly
              numberOfMonths={2}
            />
          </div>
          <div className="calendarAvailableDay_container_singleCalendar">
            <Calendar
              multiple
              value={value}
              minDate={new Date()}
              readOnly
              numberOfMonths={1}
            />
          </div>
          <div className="calendarAvailableDay_boxReservation">
            <p>Agregá tus fechas de viaje para obtener precios exactos</p>
            <Link to={`reserva`}>Reservar</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarAvailableDay;
