import React from "react";
import { Box } from '@chakra-ui/react';
import Banner from "../common/Banner";
import PriceCard from "../price/PriceCard";
import { CustomContainer } from "../common/Customcontainer";

const Pricing = () => {
  return (
    <Box mt={24}>
      <Box mb={20}>
        <Banner name='30 days money back guarantee' title='No Extra Fees. Friendly Support' cover="/images/pricing.jpg" />
        <CustomContainer>
          <PriceCard />
        </CustomContainer>
      </Box>
    </Box>
  )
}

export default Pricing