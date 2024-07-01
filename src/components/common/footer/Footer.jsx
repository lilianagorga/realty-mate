import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, SimpleGrid, Text, Flex, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 
import { HiHomeModern } from 'react-icons/hi2';
import { CustomContainer } from '../CustomContainer.jsx';
import { CustomFlexContainer } from '../CustomFlexContainer.jsx';


const Footer = () => {
  const [footerLinks, setFooterLinks] = useState({
    services: [],
    about: [],
    ourOffices: [],
    workWithUs: []
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/footer-links`)
      .then(response => {
        setFooterLinks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the footer links!', error);
      });
  }, []);

  return (
    <Box backgroundColor='blue.600'>
      <Box
        bg="#27ae60"
        p="40px 0"
        color="white"
        textAlign="center" 
      >
        <CustomContainer variant="footer">
          <CustomFlexContainer>
            <Box>
              <Heading as="h1" color="white" fontSize="40px">Do You Have Questions ?</Heading>
            </Box>
            <Link to="/contact">
              <Button variant="contactUs">Contact Us Today</Button>
            </Link>
          </CustomFlexContainer>
        </CustomContainer>
      </Box>


      <Box maxWidth='1280px' margin='0 auto' paddingY='3rem' paddingX={{ base: '2rem', sm: '3rem' }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} color='whiteAlpha.700' gap='1.7rem' minChildWidth='150px'>
          <Flex flexDirection='column'>
            <FooterHeader title='Services' />
            {footerLinks.services.map(item => (
              <FooterLink key={item.name} name={item.name} link="/work-in-progress" />
            ))}
          </Flex>
          <Flex flexDirection='column'>
            <FooterHeader title='About' />
            {footerLinks.about.map(item => (
              <FooterLink key={item.name} name={item.name} link="/work-in-progress" />
            ))}
          </Flex>
          <Flex flexDirection='column'>
            <FooterHeader title='Our Offices' />
            {footerLinks.ourOffices.map(item => (
              <FooterLink key={item.name} name={item.name} link="/work-in-progress" />
            ))}
          </Flex>
          <Flex flexDirection='column'>
            <FooterHeader title='Work With Us' />
            {footerLinks.workWithUs.map(item => (
              <FooterLink key={item.name} name={item.name} link="/work-in-progress" />
            ))}
          </Flex>
        </SimpleGrid>
      </Box>
      <Box backgroundColor='blue.900' display='flex' padding='2rem' justifyContent='center' alignItems='center' flexDirection='column' color='white'>
        <Box display='flex' gap='2' alignItems='center'>
          <HiHomeModern />
          <Text fontSize='lg' fontWeight='black'>REALTY MATE</Text>
        </Box>
        <Text marginTop='1rem' fontSize='xs' textAlign='center'>All rights reserved - Copyright REALTY MATE</Text>
      </Box>
    </Box>
  );
}

export default Footer;

const FooterLink = ({ name, link }) => {
  return (
    <Text as="a" href={link} color="inherit" _hover={{ textDecoration: "underline" }}>
      {name}
    </Text>
  );
}

const FooterHeader = ({ title }) => {
  return (
    <Text as='h4' fontWeight='light' fontSize='xl' mb='1rem'>{title}</Text>
  );
}