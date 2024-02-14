import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

function Map({ center, zoom }) {
  const containerStyle = {
    width: '100%',
    height: '70vh'
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
  >
    <Marker position={center} />
  </GoogleMap>
  );
}

export default Map;
