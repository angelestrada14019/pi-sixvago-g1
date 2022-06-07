import "./locationsList.css";
import React,{useEffect} from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
const LocationsList = ({ setLocation, setOpenLocations }) => {
    
    const {locationsList } = useStateContext();   

  return (
    <>
      {locationsList.map((loc, i) => {
        return (
          <div
            className="single-location-container"
            key={i}
            id={`${loc.name}`}
            onClick={(e) => {
              setLocation(e.target.id);
              setOpenLocations(false);
            }}
          >
            <i className="fa-solid fa-location-dot"></i>
            <li type="none">
              <ul>
                <h3>{loc.name}</h3>
              </ul>
              <ul>
                <p>{loc.name}</p>
              </ul>
            </li>
          </div>
        );
      })}
    </>
  );
};

export default LocationsList;
