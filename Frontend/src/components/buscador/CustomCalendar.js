import { useState } from "react";
import Calendar from "react-calendar";
import useWindowDimensions from "../../utils/useWindowDimensions";
import "./calendar.css";
//import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ handleCheckInOut }) => {
  const [date, setDate] = useState(new Date());
  const { width } = useWindowDimensions();

  return (
    <div className="calendar-container">
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
        value={date}
      />
      <button
        className="calendar-button-aplicar"
        onClick={() => handleCheckInOut(date)}
      >
        Aplicar
      </button>
    </div>
  );
};

export default CustomCalendar;
