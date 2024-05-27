import React from "react";
import { Box, Fade, Text } from "@chakra-ui/react";
import HeroForm from "./HeroForm.jsx";

const HeroBanner = () => {
  return (
    <Fade in>
      <Box 
        role="banner"
        position='relative' 
        minHeight={{ base:'110vh', sm:'60vh' }}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundImage="url('/hero/heroBg.jpg')"
        backgroundAttachment='fixed'
      >
        <Box position='absolute' width='100%' height='100%' backgroundColor='blue.900' opacity='0.85' />
        <Box 
          display='flex' 
          alignItems='center' 
          justifyContent={{ base:'flex-start', sm:'space-between' }}
          flexDirection={{ base:'column', sm:'row' }}
          maxWidth='1280px'
          position='absolute'
          color='white'
          fontWeight='light'
          left='0'
          right='0'
          bottom='0'
          top='0'
          margin='0 auto'
          padding='2rem'
        >
          <Box width={{ base: '100%', sm: '50%' }}>
            <Text fontSize={{ base: '4xl', sm: '5xl' }} lineHeight='shorter' marginBottom='1.5rem'>
              Download our new <strong>Property Buying Guide</strong> today...
            </Text>
            <Text fontSize={{ base: 'lg', sm: 'xl' }}>
              A Free PDF with our best secrets for evaluating property purchase, calculating profit and so much more
            </Text>
          </Box>
          <Box width={{ base: '100%', sm: 'auto' }} marginTop={{ base: '2rem', sm: '0' }}><HeroForm /></Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default HeroBanner;
