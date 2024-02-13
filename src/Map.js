import React from "react";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Map() {
  const defaultProps = {
    center: {
      lat: 41.8719,
      lng: 12.5674
    },
    zoom: 6
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div style={{ height: '70vh', width: '30%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={41.8719}
          lng={12.5674}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;