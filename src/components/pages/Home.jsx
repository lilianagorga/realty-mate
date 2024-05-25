import React, { useState, useEffect } from 'react';
import { Box, VStack, Flex, Grid, GridItem } from '@chakra-ui/react';
import Map from '../../Map.jsx';
import PlacesAutocomplete from '../../PlacesAutocomplete.jsx';
import { useJsApiLoader } from '@react-google-maps/api';
import MortgageCalculator from '../../MortgageCalculator.jsx';
import FeaturedProperties from '../property/FeaturedProperties.jsx';
import propertiesDataMock  from '../../data/properties.json';
import { getProperties } from '../../utils/fetchApi.js';
import HeroBanner from "../HeroBanner.jsx";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Team from '../team/Team.jsx';
import Price from '../price/Price.jsx';

const libraries = ['places', 'marker'];

function Home() {
  const [mapCenter, setMapCenter] = useState({ lat: 41.8719, lng: 12.5674 });
  const [zoom, setZoom] = useState(6);
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      NProgress.start();
      let data = [];
      if (process.env.REACT_APP_USE_MOCK_DATA === 'false') {
        try {
          const response = await getProperties(5);
          if (response.length > 0) {
            data = response;
          }
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      } else {
        data = propertiesDataMock.hits || [];
      }
      setPropertiesData(data);
      NProgress.done();
    };
    fetchData();
  }, []);


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
    <Box mt={24} m="auto">
      <VStack textAlign="center" alignItems="center" spacing={4} ml={72} mb={4} mt={20}>
        <PlacesAutocomplete onPlaceSelected={handlePlaceSelect} />
      </VStack>
      <Grid templateColumns="repeat(3, 1fr)" gap={20}>
        <GridItem colSpan={[3, 3, 1]}>
          <MortgageCalculator />
        </GridItem>
        <GridItem colSpan={[3, 3, 2]}>
          <Box width="full" height="400px" overflow="hidden">
            <Map isLoaded={isLoaded} center={mapCenter} zoom={zoom} onPositionChange={onStreetViewPositionChanged} />
          </Box>
        </GridItem>
      </Grid>
      <Flex direction="column" mt={10}>
      {process.env.REACT_APP_USE_MOCK_DATA === 'true' ? (
          propertiesDataMock.hits.length ? (
            <FeaturedProperties featuredProperties={propertiesDataMock.hits.slice(0, 5)} />
          ) : (
            <p>No properties found</p>
          )
        ) : process.env.REACT_APP_USE_MOCK_DATA === 'false' ? (
          propertiesData.length ? (
            <FeaturedProperties featuredProperties={propertiesData.slice(0, 5)} />
          ) : (
            <p>No properties found</p>
          )
        ) : (
          <p>No properties found</p>
        )}
      </Flex>
      <Team />
      <Price />
      <HeroBanner />
    </Box>
  );
}

export default Home;