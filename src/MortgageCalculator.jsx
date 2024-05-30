import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Box,
  Text,
  VStack,
  Container
} from '@chakra-ui/react';


function MortgageCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = (p, r, y) => {
    const monthlyRate = r / 100 / 12;
    const n = y * 12;
    const payment = (p * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    return payment.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = calculateMortgage(principal, interestRate, years);
    setMonthlyPayment(payment);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white" width="full">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" textAlign="center">Calculate Your Ideal Spending</Text>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="principal">Principal</FormLabel>
            <NumberInput onChange={(valueString) => setPrincipal(valueString)}>
              <NumberInputField id="principal" value={principal} />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="interestRate">Interest Rate (%)</FormLabel>
            <NumberInput onChange={(valueString) => setInterestRate(valueString)}>
              <NumberInputField id="interestRate" value={interestRate} />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="years">Years</FormLabel>
            <NumberInput onChange={(valueString) => setYears(valueString)}>
              <NumberInputField id="years" value={years} />
            </NumberInput>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Calculate</Button>
        </form>
        {monthlyPayment && (
          <Text mt={2}>
            Monthly Payment: <strong>€{monthlyPayment}</strong>
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default MortgageCalculator;