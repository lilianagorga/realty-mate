import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { CustomContainer } from '../CustomContainer';
import { CustomFlexContainer } from '../CustomFlexContainer';

const WorkInProgress = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundImage="url('/images/noresult.svg')"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backdropFilter="blur(5px)"
      paddingTop="4rem"
      marginTop="4rem"
    >
      <CustomContainer>
        <CustomFlexContainer justifyContent="center" alignItems="center">
          <Box
            textAlign="center"
            backgroundColor="rgba(255, 255, 255, 0.7)"
            padding="1.2rem"
            borderRadius="10px"
          >
            <Heading as="h1" size="2xl" fontWeight="bold" fontFamily="Arial, sans-serif">
              Work in Progress
            </Heading>
            <Text fontSize="xl" fontWeight="bold" fontFamily="Arial, sans-serif" marginTop="1rem">
              We are currently working on this page. Please check back later.
            </Text>
          </Box>
        </CustomFlexContainer>
      </CustomContainer>
    </Box>
  );
};

export default WorkInProgress;