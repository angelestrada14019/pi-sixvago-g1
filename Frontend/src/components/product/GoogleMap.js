import React from "react";
import Maps from "simple-react-google-maps";


const GoogleMap = () => {
    return (
      <div>
        <div className="containerMaps">
          <Maps
            apiKey={"AIzaSyDecQehxvNdL2hLcymFvcHZI1M9FkRhMYQ"}
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
