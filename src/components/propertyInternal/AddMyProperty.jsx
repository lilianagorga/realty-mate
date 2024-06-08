import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Box, FormControl, FormLabel, Input, Button, Textarea } from '@chakra-ui/react';

const AddMyProperty = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/properties`, {
        title,
        description,
        price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Box mt={10} p={10}>
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
  );
};

export default AddMyProperty;