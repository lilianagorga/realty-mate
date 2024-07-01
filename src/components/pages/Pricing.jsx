import React, {useState, useEffect, useContext} from "react";
import { Box } from '@chakra-ui/react';
import Banner from "../common/Banner.jsx";
import PriceCard from "../price/PriceCard.jsx";
import { TempCustomContainer as CustomContainer } from '../common/TempCustomContainer.jsx';
// import { CustomContainer } from "../common/CustomContainer.jsx";
import { CustomFlexContainer } from "../common/CustomFlexContainer.jsx";
import { getPrices } from "../../utils/fetchData.js";

const Pricing = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesData = await getPrices();

      const transformedPricesData = pricesData.map(price => ({
        ...price,
        features: price.features ? price.features.map((feature) => ({
          ...feature,
          icon: <span dangerouslySetInnerHTML={{ __html: JSON.parse(feature.icon) }} />
        })) : []
      }));

      setPrices(transformedPricesData);
    };
      fetchPrices();
  }, []);


  return (
    <Box mt={24}>
      <Box mb={20}>
        <Banner name='30 days money back guarantee' title='No Extra Fees. Friendly Support' cover="/images/pricing.jpg" />
        <CustomContainer>
          <CustomFlexContainer
            marginTop="50px"
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
          {prices.map((price, index) => (
              <PriceCard key={index} price={price} index={index} />
            ))}
          </CustomFlexContainer>
        </CustomContainer>
      </Box>
    </Box>
  )
}

export default Pricing