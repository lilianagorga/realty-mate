import React from "react";
import Heading from "../common/Heading";
import { Box } from "@chakra-ui/react";
import PriceCard from "./PriceCard";
import { CustomContainer } from "../common/Customcontainer";

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