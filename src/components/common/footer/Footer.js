import React from 'react';
import { Box, SimpleGrid, Text, Flex, Heading, Button } from '@chakra-ui/react';
import { services, about, ourOffices, workWithUs } from './footerConsts';
import { HiHomeModern } from 'react-icons/hi2';
import { CustomContainer } from '../Customcontainer';
import { CustomFlexContainer } from '../CustomFlexContainer';


const Footer = () => {
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
              <Text color="white" fontWeight="bold" m="20px 0">We'll help you to grow your career and growth.</Text>
            </Box>
            <Button variant="contactUs">Contact Us Today</Button>
          </CustomFlexContainer>
        </CustomContainer>
      </Box>


      <Box maxWidth='1280px' margin='0 auto' paddingY='3rem' paddingX={{ base: '2rem', sm: '0' }}>
        <SimpleGrid columns={{ base: 1, md: 4 }} color='whiteAlpha.700' gap='1.7rem' minChildWidth='150px'>
          <Flex flexDirection='column'>
            <FooterHeader title='Services' />
            {services.map(item => (
              <FooterLink key={item.name} {...item} />
            ))}
          </Flex>
          <Flex flexDirection='column'>
            <FooterHeader title='About' />
            {about.map(item => (
              <FooterLink key={item.name} {...item} />
            ))}
          </Flex>
          <Flex flexDirection='column'>
            <FooterHeader title='Our Offices' />
            {ourOffices.map(item => (
              <FooterLink key={item.name} {...item} />
            ))}
          </Flex>
          <Flex flexDirection='column'>
            <FooterHeader title='Work With Us' />
            {workWithUs.map(item => (
              <FooterLink key={item.name} {...item} />
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