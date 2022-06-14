import React from "react";
import Maps from "simple-react-google-maps";


const GoogleMap = () => {
    return (
      <div>
        <h2>Mapa</h2>
        <div className="containerMaps">
            {/* {console.log(process.env.REACT_APP_GOOGLE_API_KEY)} */}
          <Maps
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            style={{ height: "400", widht: "300" }}
            zoom={12}
            center={{
              lat: 40.4127355,
              lng: -3.695428,
            }}
            markers={[{ lat: 40.409711, lng: -3.692569 }]}
          />
        </div>
      </div>
    );
  }

export default GoogleMap;
