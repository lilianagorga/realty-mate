import React, { useState, useEffect } from 'react';
import { Box, Grid, Image } from '@chakra-ui/react';
import { getPartners } from '../../utils/fetchData.js';
import Heading from '../common/Heading.jsx';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const data = await getPartners();
      setPartners(data);
    };

    fetchPartners();
  }, []);

  return (
    <Box textAlign="center" mt={10} mb={10} maxW="1200px" mx="auto">
      <Box bg="gray.100" p={4} mx={4} borderRadius="md" mb={6}>
        <Heading title="Our Partners" subtitle="" />
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {partners.map((partner, index) => (
          <Box key={index} display="flex" justifyContent="center" alignItems="center">
            <Image
              src={partner.logo}
              alt={partner.name}
              alignSelf='center'
              padding="2rem"
              filter='grayScale(1)'
              opacity='0.4'
              boxSize="200px"
              objectFit="contain"
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Partners;