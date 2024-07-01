import React from 'react';
import axios from 'axios';
import { Box, Button, Checkbox, FormControl, Input, Text, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, data, {headers});
        alert('Message sent successfully');
        reset();
      } catch(error) {
        alert('Error sending message');
        console.error('There was an error sending the message!', error);
      }
  };

  return (
    <Box width='100%' borderRadius='sm' backgroundColor='white' color='gray.700'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input marginTop='1.3rem' type='text' placeholder='Name' id='name' {...register('name', { required: 'Name is required' })} />
          {errors.name && <Text fontSize='xs' color='red.400'>{errors.name.message}</Text>}
          <Input marginTop='1.3rem' type='email' placeholder='Email' id='email' {...register('email', { required: 'Email is required' })} />
          {errors.email && <Text fontSize='xs' color='red.400'>{errors.email.message}</Text>}
          <Input marginTop='1.3rem' type='text' placeholder='Phone' id='phone' {...register('phone', { required: 'Phone is required' })} />
          {errors.phone && <Text fontSize='xs' color='red.400'>{errors.phone.message}</Text>}
          <Textarea marginTop='1.3rem' type='textarea' placeholder='Message' id='message' {...register('message', { required: false })} />
          <Checkbox marginTop='1.3rem' type='checkbox' id='gdpr' {...register('gdpr', { required: 'Approval is required' })}>
            <Text fontSize='0.8rem' color='gray.500'>I consent to having this website store my submitted information for future correspondence.</Text>
          </Checkbox>
          {errors.gdpr && <Text fontSize='xs' color='red.400'>{errors.gdpr.message}</Text>}
        </FormControl>
        <Button type='submit' colorScheme='blue' fontSize='xl' padding='2rem' marginTop='2rem'>Send Message</Button>
      </form>
    </Box>
  );
};

export default ContactForm;
