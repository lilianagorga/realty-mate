import React, { useState, useEffect } from "react";
import { Box, Badge, Flex, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { TbMapPin } from "react-icons/tb";
import PropertyThumbnailSlider from "./PropertyThumbnailSlider";
import PropertyStats from "./PropertyStats";
import { usePropertyFormat } from "../../hooks/usePropertyFormat";
import { getProperty } from '../../utils/fetchApi';
import singlePropertyMock from '../../data/property.json';
import { useParams } from 'react-router-dom';
import TextContentBox from "../TextContentBox";


const Property = () => {
  
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      let data = null;
      if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
        data = singlePropertyMock;
      } else {
        try {
          data = await getProperty(id);
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      }
      setProperty(data || {});
    };
    fetchProperty();
  }, [id]);

  console.log(property);
  const {     
    address,
    propertyType,
    price,
    title,
    rooms,
    baths,
    purpose,
    sqSize,
    externalID,
    photos,
    description,
    amenities,
  } = usePropertyFormat(property);

  if (!property || Object.keys(property).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box backgroundColor='#f7f8f9' paddingY='3rem'>
        <Grid 
          templateColumns='repeat(6, 1fr)'
          gap='5'
          maxWidth='1280px'
          margin='0 auto'
        >
          <GridItem colSpan='6'>
            <Text fontSize='3xl' fontWeight='medium' color='blue.800' textAlign={{ base: 'center', sm: 'left' }}>
              {propertyType} {title}
            </Text>
            <Flex 
              fontSize='xl' 
              color='blue.600' 
              textAlign='center' 
              alignItems='center' 
              flexDirection={{base: 'column', sm: 'row'}}
              gap='0.5rem' 
              marginY={{base: '1rem', sm: '0'}}
            >
              <TbMapPin />
              <Text fontWeight='light' >
                {address} - ID:{externalID}
              </Text>
              <Badge colorScheme='green'>{purpose}</Badge>
            </Flex>
          </GridItem>
          <GridItem colSpan={{base: '6', sm: '3'}}>
            <PropertyThumbnailSlider photos={photos} />
          </GridItem>
          <GridItem colSpan={{base: '6', sm: '3'}}>
            <PropertyStats price={price} rooms={rooms} baths={baths} sqSize={sqSize} />
            <TextContentBox title='Description'>
              <Text fontWeight='light' color='gray.600' fontSize='1rem' noOfLines='4'>{description}</Text>
            </TextContentBox>
            <TextContentBox title='Amenities'>
              <SimpleGrid columns={{base: 1, sm: 2}} fontWeight='light' color='gray.600' fontSize='1rem'>
                {amenities.length 
                  ? amenities.map((item, index) => <Text key={index}>{item}</Text>)
                  : 'Please contact us for more info' }
              </SimpleGrid>
            </TextContentBox>
          </GridItem>
        </Grid>
      </Box>
  );
};

export default Property;