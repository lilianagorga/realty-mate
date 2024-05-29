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
      const map = panoramaRef.current && typeof panoramaRef.current.getMap === 'function' && panoramaRef.current.getMap();
      
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
    if (panoramaRef.current) {
      panoramaRef.current.addListener('position_changed', handlePositionChange);
    }

    return () => {
      if (panoramaRef.current) {
        window.google.maps.event.clearListeners(panoramaRef.current, 'position_changed');
      }
    };
  }, [center, panoramaPosition]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
    <div data-testid="google-map" />
    <StreetViewPanorama 
      options={panoramaOptions} 
      onLoad={(panorama) => {
          panoramaRef.current = panorama;
          panorama.addListener('position_changed', handlePositionChange);
        }}
    />
    </GoogleMap>
  );
}

export default Map;
