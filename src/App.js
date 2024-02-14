import React, { useState } from 'react';
import Map from './Map';
import PlacesAutocomplete from './PlacesAutocomplete';
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

function App() {
  const [mapCenter, setMapCenter] = useState({ lat: 41.8719, lng: 12.5674 });
  const [zoom, setZoom] = useState(6);

  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setZoom(15);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries={libraries}>
      <PlacesAutocomplete onPlaceSelected={handlePlaceSelect} />
      <Map center={mapCenter} zoom={zoom} />
  </LoadScript>
  );
}

export default App;
