import React from "react";
import { Box, Button, Checkbox, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

const HeroForm = () => {
  const { register, handleSubmit, formState:{ errors }, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(`${import.meta.env.VITE_API_URL}/send-guide`, data, { headers });
      alert('PDF Guide sent successfully to your email');
      reset();
    } catch (error) {
      console.error('Error sending PDF guide:', error);
      alert('Failed to send PDF guide');
    }
  };

  return (
    <Box width='100%' padding='2rem' borderRadius='sm' backgroundColor='white' color='gray.700'>
      <Text fontSize='xl' fontWeight='bold'>Free PDF Guide</Text>
      <Text fontSize='lg'>Complete the form below to download your guide</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Flex gap={{ base: '0', sm: '1rem' }} flexDirection='column'>
            <Input marginTop='1.3rem' id="name" type='text' placeholder='Name' {...register('name', { required: true })} />
            {errors.name && <Text fontSize='xs' color='red.400'>{errors.name.type}</Text>}
            <Input marginTop='1.3rem' id="email" type='email' placeholder='Email' {...register('email', { required: true })} />
            {errors.email && <Text fontSize='xs' color='red.400'>{errors.email.type}</Text>}
            <Input marginTop='1.3rem' id="phone" type='text' placeholder='Phone' {...register('phone', { required: true })} />
            {errors.phone && <Text fontSize='xs' color='red.400'>{errors.phone.type}</Text>}
          </Flex>
          <Checkbox marginTop='1.3rem' id="gdpr" {...register('gdpr', { required: true })}>
            I consent to having this website store my submitted info
          </Checkbox>
          {errors.gdpr && <Text fontSize='xs' color='red.400'>{errors.gdpr.type}</Text>}
        </FormControl>
        <Button type="submit" colorScheme="blue" width='100%' fontSize='xl' padding='2rem' marginTop='2rem'>Download Now</Button>
      </form>
    </Box>
  );
};

export default HeroForm;