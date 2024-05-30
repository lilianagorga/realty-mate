import React from "react";
import { Box, Fade, Text, Grid, GridItem } from "@chakra-ui/react";
import HeroForm from "./HeroForm.jsx";

const HeroBanner = () => {
  return (
    <Fade in>
      <Box 
        role="banner"
        position='relative' 
        minHeight={{ base: 'auto', sm: '60vh' }}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundImage="url('/hero/heroBg.jpg')"
      >
        <Box position='absolute' width='100%' height='100%' backgroundColor='blue.900' opacity='0.85' />
        <Box 
          maxWidth='1280px'
          position='relative'
          color='white'
          fontWeight='light'
          left='0'
          right='0'
          margin='0 auto'
          padding='2rem'
        >
          <Grid 
            templateColumns={{ base: '1fr', md: '1fr 1fr' }} 
            gap={6} 
            alignItems='center'
            width='100%'
          >
            <GridItem>
              <Text fontSize={{ base: '2xl', sm: '5xl' }} lineHeight='shorter' marginBottom='1.5rem'>
                Download our new <strong>Property Buying Guide</strong> today...
              </Text>
              <Text fontSize={{ base: 'md', sm: 'xl' }}>
                A Free PDF with our best secrets for evaluating property purchase, calculating profit and so much more
              </Text>
            </GridItem>
            <GridItem>
              <HeroForm />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Fade>
  );
};

export default HeroBanner;