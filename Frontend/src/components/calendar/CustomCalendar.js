import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useLocation } from "react-router-dom";
import useWindowDimensions from "../../utils/useWindowDimensions";
import "./calendar.css";
//import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ handleCheckInOut }) => {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const { width } = useWindowDimensions();
  const { pathname: currentLocation } = useLocation();
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
    <div
      className={`calendar-container ${
        currentLocation === "/" ? "absolute" : "none"
      }`}
    >
      <Calendar
        showDoubleView={width >= 600}
        selectRange
        minDetail="month"
        formatShortWeekday={(locale, date) => date.toString().charAt(0)}
        navigationLabel={({ label }) => label.split(" ")[0]}
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
        nextLabel={<i className="fa-solid fa-angle-right"></i>}
        prevLabel={<i className="fa-solid fa-angle-left"></i>}
        onChange={setDate}
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
