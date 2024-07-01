import React, { useState, useEffect, useContext } from "react";
import Heading from "../common/Heading.jsx";
import { Box } from "@chakra-ui/react";
import PriceCard from "./PriceCard.jsx";
import { CustomContainer } from "../common/CustomContainer.jsx";
import { CustomFlexContainer } from "../common/CustomFlexContainer.jsx";
import { getPrices } from "../../utils/fetchData.js";

const Price = () => {
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
    <>
      <Box textAlign="center" p="80px 0" >
        <CustomContainer>
          <Heading title="Select Your Package" subtitle="Choose the perfect plan tailored to your needs." />
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
    </>
  )
}

export default Price