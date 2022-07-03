import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mapReact.css";
import IconLocation from "./IconLocation";

const centerD = {
  lat: 4.757012975269627,
  lng: -74.04449788211627,
};


const MapReact = ({producto}) => {

    const [center, setCenter] = React.useState(centerD);
    useEffect(() => {
        getLatLng();
        return () => {
        };
    }, []);
    const getLatLng=()=>{
       
    }
  return (
    <>
      <MapContainer center={center} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={IconLocation}>
          <Popup>
            <p>Direccion: <span>{producto.direccion}</span></p>
            <p>Nombre: <span>{producto.nombre}</span></p>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapReact;
