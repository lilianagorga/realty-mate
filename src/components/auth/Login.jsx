import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Box, FormControl, FormLabel, Input, Button, Text, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      p={5}
    >
      <Box
        maxW="400px"
        width="100%"
        p={8}
        bg="rgba(255, 255, 255, 0.8)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        borderRadius="md"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Heading as="h2" mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" colorScheme="blue" mb={4}>
            Login
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </form>
      </Box>
    </Box>
  );
};

export default Login;