// import Maps from "simple-react-google-maps";

// const GoogleMap = () => {
//   return (
//     <div>
//       <h2>Mapa</h2>
//       <div className="containerMaps">
//         {/* {console.log(process.env.REACT_APP_GOOGLE_API_KEY)} */}
//         <Maps
//           apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
//           style={{ height: "400", widht: "300" }}
//           zoom={12}
//           center={{
//             lat: 40.4127355,
//             lng: -3.695428,
//           }}
//           markers={[{ lat: 40.409711, lng: -3.692569 }]}
//         />
//       </div>
//     </div>
//   );
// };

// export default GoogleMap;

import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function GoogleMapC() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapC)
