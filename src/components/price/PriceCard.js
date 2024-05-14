import React from "react";
import { price } from "../../constants/data";
import { Box, Button, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { CustomFlexContainer } from "../common/CustomFlexContainer";

const PriceCard = () => {
  return (
    <>
      <CustomFlexContainer
        marginTop="50px"
      >
        {price.map((item, index) => (
          <Box 
            key={index}
            w={{ base: "100%", md: "31.5%" }}
            p="30px"
            borderRadius="10px"
            boxShadow="0 0 20px 0 rgba(112, 121, 138, 0.18)"
            mb={{ base: "50px", md: "0" }}
          >
            <Box display={index === 0 || index === 2 ? "none" : "block"}>
              <Button
                bg="#ff6922"
                borderRadius="50px"
                color="white"
                p="17px 30px"
                fontWeight="bold"
                mb="20px"
              >
                {item.best}
            </Button>
            </Box>
            <Heading as="h3" fontSize="22px">{item.plan}</Heading>
            <Heading as="h1" fontSize="60px">
              <Text as="span" fontSize="30px" fontWeight="500">$</Text>
              {item.price}
            </Heading>
            <Text>{item.ptext}</Text>
            <UnorderedList mt="40px" styleType="none">
              {item.list.map((val, index) => {
                const { icon, text, change } = val;
                return (
                  <ListItem key={index} display="flex" alignItems="center" mb="20px">
                    <Box
                      as="label"
                      w="30px"
                      h="30px"
                      lineHeight="30px"
                      borderRadius="full"
                      mr="20px"
                      bg={change === "color" ? "price.100" : "price.200"}
                      color={change === "color" ? "price.300" : "price.400"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {icon}
                    </Box>
                    <Text>{text}</Text>
                  </ListItem>
                )
              })}
            </UnorderedList>
            <Button
              w="full"
              borderRadius="50px"
              fontSize="20px"
              p="30px 40px"
              color={item.plan === "Standard" ? "white" : "price.400"}
              bg={item.plan === "Standard" ? "price.400" : "white"}
              fontWeight="bold"
              border="5px solid"
              borderColor="price.200"
              mb="20px"
            >
              Start {item.plan}
            </Button>
          </Box>
        ))}
      </CustomFlexContainer>
    </>
  )
}

export default PriceCard