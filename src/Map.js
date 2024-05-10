import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';

function Map({ center, zoom, onPositionChange, isLoaded }) {
  const containerStyle = {
    width: '70%',
    height: '50vh'
  };

  const panoramaRef = useRef(null);
  const [panoramaPosition, setPanoramaPosition] = useState(center);

  useEffect(() => {
    if (isLoaded && window.google && window.google.maps) {
      const { AdvancedMarkerElement } = window.google.maps.marker;

      const map = panoramaRef.current && panoramaRef.current.getMap();
      
      if (map) {
        new AdvancedMarkerElement({
          position: center,
          map: map,
        });
      }
    }
  }, [isLoaded, center]);
  
  const panoramaOptions = {
    position: center,
    pov: { heading: 100, pitch: 0 },
    motionTracking: false, 
    enableCloseButton: true,
    visible: true,
  };
  
  const handlePositionChange = () => {
    if (window.google && window.google.maps && panoramaRef.current) {
      const newPosition = panoramaRef.current.getPosition().toJSON();
      if (newPosition.lat !== panoramaPosition.lat || newPosition.lng !== panoramaPosition.lng) {
        setPanoramaPosition(newPosition);
        onPositionChange(newPosition);
      }
    }
  }

  useEffect(() => {
    if (panoramaRef.current && (center.lat !== panoramaPosition.lat || center.lng !== panoramaPosition.lng)) {
      panoramaRef.current.setPosition(center);
    }
  }, [center, panoramaPosition]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
    <StreetViewPanorama options={panoramaOptions} onPositionChanged={handlePositionChange} />
    </GoogleMap>
  );
}

export default Map;
