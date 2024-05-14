import React from 'react';
import { Box, Text, Button, Image } from '@chakra-ui/react';
import Partners from '../partners/Partners';
import Testimonials from '../testimonials/Testimonials';
import Banner from "../common/Banner";
import Heading from "../common/Heading";

const About = () => {
  return (
    <Box mt={14}>
      <Box as='section' marginBottom={20}>
        <Banner name='About Us' title='About Us - Who We Are?' cover="/images/about.jpg" />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="50px"
          maxW={{ base: "90%", md: "80%" }}
          m="auto"
        >
          <Box textAlign="left" width="full" py={{ base: "0", md: "5%" }}>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' variant="aboutPage" />
            <Text variant="paragraph">
              At RealtyMate, we are committed to delivering exceptional real estate experiences. 
              Our experts are here to guide you through every step of buying, selling or renting properties, 
              ensuring complete transparency and trust.
            </Text>
            <Text variant="paragraph">
              We pride ourselves on our extensive market knowledge and our ability to provide tailored advice 
              to each client. Whether you're a first-time buyer or a seasoned investor, we strive to deliver 
              the best possible outcomes.
            </Text>
            <Button
              borderRadius="50px"
              border="none"
              color="white"
              cursor="pointer"
              fontWeight="bold"
              fontSize="20px"
              bg="#27ae60"
              p="25px 30px"
            >
              More About Us
            </Button>
          </Box>
          <Box mt={{ base: "50px", md: "20px" }}>
            <Image src='./immio.jpg' alt='' />
          </Box>
        </Box>
      </Box>

      <Partners />
      <Testimonials />
    </Box>
    
  );
};

export default About;
