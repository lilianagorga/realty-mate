import React from "react"
import { Box, Image, Text, Heading } from "@chakra-ui/react";
import { CustomContainer } from "./Customcontainer.jsx";


const Banner = ({ name, title, cover }) => {
  return (
    <>
      <Box
        h={{ base: "30vh", md: "40vh" }}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          top: "0",
          left: "0",
          width: "full",
          height: { base: "30vh", md: "40vh" },
          bg: "rgba(17, 40, 72, 0.629)",
          zIndex: "-1"
        }}
        >
        <CustomContainer color="white" p="120px 0">
          <Text fontSize="lg">{name}</Text>
          <Heading as="h1" fontSize={{ base: "30px", md: "40px" }} fontWeight="500">{title}</Heading>
        </CustomContainer>
        <Image  src={cover}
          alt=""
          height={{ base: "30vh", md: "40vh" }}
          position="absolute"
          top="0"
          left="0"
          zIndex="-1"
          objectFit="cover"
          width="full" 
        />
      </Box>
    </>
  )
}

export default Banner