import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import mockData from '../../data/mockData.json';
import ImageScrollbar from '../ImageScrollbar';

function PropertyDetails() {
  const { id } = useParams();
  const property = mockData.hits.find((p) => p.externalID === id);

  if (!property) {
    return <Box>Property not found.</Box>;
  }

  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {property.photos && <ImageScrollbar data={property.photos} />}
      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center">
          <Box paddingRight="3" color="green.400">
            {property.isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            {millify(property.price)}{property.rentFrequency && `/${property.rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar 
          // size="sm"
          src={property.agency?.logo?.url}
          boxSize='30px'
          ></Avatar>
        </Flex>
        <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
          {property.rooms} <FaBed /> | {property.baths} <FaBath /> | {millify(property.area)} sqft <BsGridFill />
        </Flex>
        <Box marginTop="2">
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {property.title}
          </Text>
          <Text lineHeight="2" color="gray.600">{property.description}</Text>
        </Box>
        <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
          <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
            <Text>Type</Text>
            <Text fontWeight="bold">{property.type}</Text>
          </Flex>
          <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
            <Text>Purpose</Text>
            <Text fontWeight="bold">{property.purpose}</Text>
          </Flex>
          {property.furnishingStatus && (
            <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
              <Text>Furnishing Status</Text>
              <Text fontWeight="bold">{property.furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {property.amenities && property.amenities.length > 0 && (
            <Text fontSize="2xl" fontWeight="black" marginTop="5">Facilities:</Text>
          )}
          <Flex flexWrap="wrap">
            {property.amenities && property.amenities.map((amenity) => (
              <Text key={amenity.text} fontWeight="bold" color="blue.400" fontSize="lg" p="2" bg="gray.200" m="1" borderRadius="5">
                {amenity.text}
              </Text>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default PropertyDetails;