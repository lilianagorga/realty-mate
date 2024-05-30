import React, { useRef, useEffect } from 'react';
import { Input, Box } from '@chakra-ui/react';

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
    <Box width="100%">
      <Input id="autocomplete" placeholder="Explore your next home..." type="text" />
    </Box>
  );
}

export default PlacesAutocomplete;
