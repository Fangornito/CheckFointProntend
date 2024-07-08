import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { CountriesQuery, getCountriesDocument, useCreateMutation } from '@/graphql/generated/schema';
import { useQuery } from '@apollo/client';


const CountryForm = () => {
  const toast = useToast();
  const [addCountry, {loading}] = useCreateMutation()
  const { refetch } = useQuery<CountriesQuery>(getCountriesDocument);
  const [formState, setFormState] = useState({
    name: '',
    code: '',
    emoji: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: {
          data: {
            name: formState.name,
            code: formState.code,
            emoji: formState.emoji,
          },
        },
        refetchQueries: [{query: getCountriesDocument }]
      });
      toast({
        title: 'Country added',
        description: `${formState.name} (${formState.code}) has been added successfully!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormState({ name: '', code: '', emoji: ''});
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Failed to add country. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error adding country:', error);
    }
  };

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mx={6}
      mt={8}
      bg="white"
    >
      <form onSubmit={handleSubmit}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <FormControl mb={4} mr={{ md: 4 }}>
            <FormLabel>Country Name</FormLabel>
            <Input
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl mb={4} mr={{ md: 4 }}>
            <FormLabel>Country Code</FormLabel>
            <Input
              name="code"
              value={formState.code}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Emoji</FormLabel>
            <Input
              name="emoji"
              value={formState.emoji}
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Flex>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          loadingText="Adding..."
          mt={4}
        >
          Add Country
        </Button>
      </form>
    </Box>
  );
};

export default CountryForm;
