import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed');
    }
  };

  return (
    <Box mt={10} p={10}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Name:</FormLabel>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            required 
          />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email:</FormLabel>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password:</FormLabel>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
        </FormControl>
        <FormControl id="password_confirmation" mb={4}>
          <FormLabel>Confirm Password:</FormLabel>
          <Input 
            type="password" 
            value={passwordConfirmation} 
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
            placeholder="Confirm Password" 
            required 
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mb={4}>
          Register
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </form>
    </Box>
  );
};

export default Register;