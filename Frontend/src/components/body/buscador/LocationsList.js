import React, { useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import "./locationsList.css";

const LocationsList = ({ setLocation, setOpenLocations }) => {

  const { locationsList } = useStateContext();

  return (
    <>
      {locationsList.map((loc, i) => {
        return (
          <div role="listitem"
            className="single-location-container"
            key={i}
            id={`${loc.nombre}`}
            onClick={(e) => {
              setLocation(e.target.id);
              setOpenLocations(false);
            }}
          >
            <i className="fa-solid fa-location-dot"></i>
            <ul  type="none">
              <li>
                <h3>{loc.nombre}</h3>
              </li>
              <li>
                <p>{loc.pais}</p>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default LocationsList;
