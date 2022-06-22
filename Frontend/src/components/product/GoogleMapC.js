import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import ApiCall from "../../utils/ApiCall";
const containerStyle = {
  width: "98%",
  height: "600px",
  marginLeft:"10px",
  marginRight:"20px",
  marginTop:"10px",
  marginBottom:"10px"
};

const centerD = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMapC = ({ id }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [center, setCenter] = React.useState(centerD);
  const [direccion, setDireccion] = React.useState({
    direccion: "",
    ciudad: "",
    pais: "",
  });

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    const productoObtenido = await ApiCall.invokeGET(`/productos/${id}`);
    // console.log(
    //   "headerProducto" +
    //     productoObtenido.caracteristicas.map((item) => item.nombre)
    // );
    console.log(productoObtenido);
    setDireccion({
      direccion: productoObtenido.body.direccion,
      ciudad: productoObtenido.body.ciudades_id.nombre,
      pais: productoObtenido.body.ciudades_id.pais,
    });
  };

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("es");
  Geocode.setLocationType("ROOFTOP");
  // Enable or disable logs. Its optional.
  Geocode.enableDebug();
  // Get latitude & longitude from address.
  console.log(direccion);
  try {
    Geocode.fromAddress(
      `${direccion.direccion} ${direccion.ciudad} ${direccion.pais}`
    ).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({ lat, lng });
      },
      (error) => {
        console.error(error);
      }
    );
  } catch (e) {
    console.log(e);
  }

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMapC);
