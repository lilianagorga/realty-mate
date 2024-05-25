import React from "react";
import Heading from "../common/Heading.jsx";
import { Box } from "@chakra-ui/react";
import PriceCard from "./PriceCard.jsx";
import { CustomContainer } from "../common/Customcontainer.jsx";

const Price = () => {
  return (
    <>
      <Box textAlign="center" p="80px 0" >
        <CustomContainer>
          <Heading title="Select Your Package" subtitle="Choose the perfect plan tailored to your needs." />
          <PriceCard />
        </CustomContainer>
      </Box>
    </>
  )
}

export default Price