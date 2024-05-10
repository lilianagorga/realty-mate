import React from 'react';
import { Box, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { services, about, ourOffices, workWithUs } from './footerConsts';
import { HiHomeModern } from 'react-icons/hi2';
import "../../../assets/css/footer.css";


const Footer = () => {
  return (
    <Box backgroundColor='blue.600'>

      <Box className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <button className='btn5'>Contact Us Today</button>
          </div>
        </div>
      </Box>


      <Box maxWidth='1280px' margin='0 auto' paddingY='3rem' paddingX={{ base: '2rem', sm: '0' }}>
        <SimpleGrid columns='4' color='whiteAlpha.700' gap='1.7rem' minChildWidth='150px'>
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
    <Text>
      <a href={link}>{name}</a>
    </Text>
  );
}

const FooterHeader = ({ title }) => {
  return (
    <Text as='h4' fontWeight='light' fontSize='xl' marginBottom='1rem'>{title}</Text>
  );
}