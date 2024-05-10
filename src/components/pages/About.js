import React from 'react';
import { Box } from '@chakra-ui/react';
import Partners from '../partners/Partners';
import Testimonials from '../testimonials/Testimonials';
import Back from "../common/Banner";
import Heading from "../common/Heading";
import "../../assets/css/about.css";

const About = () => {
  return (
    <Box mt={14}>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover="/images/about.jpg" />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />
            <p>
              At RealtyMate, we are committed to delivering exceptional real estate experiences. 
              Our experts are here to guide you through every step of buying, selling or renting properties, 
              ensuring complete transparency and trust.
            </p>
            <p>
              We pride ourselves on our extensive market knowledge and our ability to provide tailored advice 
              to each client. Whether you're a first-time buyer or a seasoned investor, we strive to deliver 
              the best possible outcomes.
            </p>
            <button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>

      <Partners />
      <Testimonials />
    </Box>
    
  );
};

export default About;
