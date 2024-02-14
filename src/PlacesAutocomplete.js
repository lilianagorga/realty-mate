import React, { useRef, useEffect } from 'react';
function PlacesAutocomplete({ onPlaceSelected }) {
  const autocompleteRef = useRef(null);
  
  useEffect(() => {
    if (!autocompleteRef.current && window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        { types: ['geocode'] }
      );
      autocompleteRef.current.addListener('place_changed', () => {
        if (onPlaceSelected) {
          onPlaceSelected(autocompleteRef.current.getPlace());
        }
      });
    }
  }, [onPlaceSelected]);

  return (
    <div>
      <input id="autocomplete" placeholder="Inserisci un indirizzo" type="text" />
    </div>
  );
}

export default PlacesAutocomplete;
