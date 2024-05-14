import React from "react";
import { Box, Heading as ChakraHeading, Text } from "@chakra-ui/react";

const Heading = ({ title, subtitle, variant }) => {
  const isAboutPage = variant === "aboutPage";
  return (
    <>
      <Box 
          textAlign={isAboutPage ? "left" : "center"}
          width={{ base: "100%", md: "60%" }} 
          margin={isAboutPage ? "0" : "auto"}
        >
        <ChakraHeading 
          color="heading.100"
          fontWeight="600"
          textTransform="capitalize"
          fontSize={{ base: "28px", md: "35px", lg: "50px" }}
        >
        {title}
        </ChakraHeading>
        <Text color="heading.200" fontSize="lg">{subtitle}</Text>
      </Box>
    </>
  )
}

export default Heading