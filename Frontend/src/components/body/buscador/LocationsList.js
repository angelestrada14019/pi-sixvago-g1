import "./locationsList.css";
import listado from "../listado.json";

const LocationsList = ({ setLocation, setOpenLocations }) => {
  return (
    <>
      {listado.map((loc, i) => {
        return (
          <div
            className="single-location-container"
            key={i}
            id={`${loc.location}`}
            onClick={(e) => {
              setLocation(e.target.id);
              setOpenLocations(false);
            }}
          >
            <i className="fa-solid fa-location-dot"></i>
            <li type="none">
              <ul>
                <h3>{loc.location}</h3>
              </ul>
              <ul>
                <p>{loc.location}</p>
              </ul>
            </li>
          </div>
        );
      })}
    </>
  );
};

export default LocationsList;
