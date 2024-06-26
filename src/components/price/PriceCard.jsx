import React from "react";
import { Box, Button, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { convertToEuro } from '../../utils/currency.js';

const PriceCard = ({ price, index }) => {
  return (
    <Box 
      w={{ base: "100%", md: "31.5%" }}
      p="30px"
      borderRadius="10px"
      boxShadow="0 0 20px 0 rgba(112, 121, 138, 0.18)"
      mb={{ base: "50px", md: "0" }}
    >
      <Box display={index === 0 || index === 2 ? "none" : "block"}>
        {price.best && (
          <Button
            bg="#ff6922"
            borderRadius="50px"
            color="white"
            p="17px 30px"
            fontWeight="bold"
            mb="20px"
          >
            {price.best}
          </Button>
        )}
      </Box>
      <Heading as="h3" fontSize="22px">{price.plan}</Heading>
      <Heading as="h1" fontSize="60px">
        {convertToEuro(price.price)}
      </Heading>
      <Text>{price.ptext}</Text>
      <UnorderedList mt="40px" styleType="none">
        {price.features && price.features.map((feature, featureIndex) => (
          <ListItem key={featureIndex} display="flex" alignItems="center" mb="20px">
            <Box
              as="label"
              w="30px"
              h="30px"
              lineHeight="30px"
              borderRadius="full"
              mr="20px"
              bg={feature.change === "color" ? "price.100" : "price.200"}
              color={feature.change === "color" ? "price.300" : "price.400"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              data-testid={`feature-icon-${index}-${featureIndex}`}
            >
            {feature.icon}
            </Box>
            <Text data-testid={`feature-text-${index}-${featureIndex}`}>{feature.text}</Text>
          </ListItem>
        ))}
      </UnorderedList>
      <Button
        w="full"
        borderRadius="50px"
        fontSize="20px"
        p="30px 40px"
        color={price.plan === "Standard" ? "white" : "price.400"}
        bg={price.plan === "Standard" ? "price.400" : "white"}
        fontWeight="bold"
        border="5px solid"
        borderColor="price.200"
        mb="20px"
      >
        Start {price.plan}
      </Button>
    </Box>
  );
};

export default PriceCard