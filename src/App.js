import React, { useState } from 'react';
import Map from './Map';
import PlacesAutocomplete from './PlacesAutocomplete';
import { useJsApiLoader } from '@react-google-maps/api';
import MortgageCalculator from './MortgageCalculator';

const libraries = ['places'];

function App() {
  const [mapCenter, setMapCenter] = useState({ lat: 41.8719, lng: 12.5674 });
  const [zoom, setZoom] = useState(6);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: libraries
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setMapCenter(location);
      setZoom(15);
      checkStreetViewAvailability(location);
    }
  };

  const onStreetViewPositionChanged = (newPosition) => {
    if (Math.abs(newPosition.lat - mapCenter.lat) > 0.0001 || Math.abs(newPosition.lng - mapCenter.lng) > 0.0001) {
      console.log('New Position Street View:', newPosition);
      setMapCenter(newPosition);
    }
  };
  
  const checkStreetViewAvailability = (location) => {
    const sv = new window.google.maps.StreetViewService();

    sv.getPanorama({ location, radius: 50 }, (data, status) => {
      if (status === window.google.maps.StreetViewStatus.OK) {
        console.log('Street View available.', data);
      } else {
        console.error('Street View not available for this position.', status);
      }
    });
  };

  return (
    <>
    <PlacesAutocomplete onPlaceSelected={handlePlaceSelect} />
    <Map center={mapCenter} zoom={zoom} onPositionChange={onStreetViewPositionChanged}/>
    <MortgageCalculator />
  </>
  );
}

export default App;