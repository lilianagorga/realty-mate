import React from "react";
import { Box } from '@chakra-ui/react';
import Back from "../common/Banner";
import PriceCard from "../price/PriceCard";
import "../../assets/css/price.css";

const Pricing = () => {
  return (
    <Box mt={24}>
      <section className='pricing mb'>
        <Back name='30 days money back guarantee' title='No Extra Fees. Friendly Support' cover="/images/pricing.jpg" />
        <div className='price container'>
          <PriceCard />
        </div>
      </section>
    </Box>
  )
}

export default Pricing