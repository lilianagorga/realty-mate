import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Box, FormControl, FormLabel, Input, Button, Textarea, Alert, AlertIcon, Heading } from '@chakra-ui/react';

const AddMyProperty = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPrice = price.replace('€', '').trim();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/properties`, {
        title,
        description,
        price: formattedPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage('Property added successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={5}>
      <Box 
        maxW="600px"
        width="100%"
        p={8}
        bg="rgba(255, 255, 255, 0.8)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        borderRadius="md"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Add Property
        </Heading>
        {successMessage && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              {successMessage}
            </Alert>
          )}
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Title:</FormLabel>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Title" 
              required 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description:</FormLabel>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description" 
              required 
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price:</FormLabel>
            <Input 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="Price" 
              required 
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">Add Property</Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddMyProperty;