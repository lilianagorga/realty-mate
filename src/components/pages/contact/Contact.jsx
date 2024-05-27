import React from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import ContactForm from './ContactForm.jsx';
import TextContentBox from '../../common/TextContentBox.jsx';

const Contact = () => {
  return (
    <Box py={3} my={20}>
      <Grid 
        templateColumns='repeat(6, 1fr)' 
        gap='5' 
        maxWidth='1280px' 
        margin='0 auto' 
        shadow="xl"
        p={5}
        bg='brand.100'
        borderRadius="lg"
      >
        <GridItem colSpan={{ base: 6, sm: 4 }}>
          <TextContentBox title='Contact Us'>
            <ContactForm />
          </TextContentBox>
        </GridItem>
        <GridItem colSpan={{ base: 6, sm: 2 }}>
          <TextContentBox title='For Inquiries Contact:'>
            <Text fontWeight='light' color='gray.600' fontSize='1rem' marginBottom='1rem'>
              Laura Rossi <br />
              Public Relations Manager <br />
              Via Dante 12, 20121 Milano, Italia
            </Text>
            <Text fontWeight='light' color='gray.600' fontSize='1rem' marginBottom='1rem'>
              Luca Bianchi <br />
              Customer Service Manager <br />
              Via Verdi 15, 20122 Milano, Italia
            </Text>
          </TextContentBox>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Contact;