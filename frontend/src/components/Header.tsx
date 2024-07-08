import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="green.500" color="white" py={2} textAlign="center">
      <Heading as="h1" size="lg">
        Checkpoint: Frontend
      </Heading>
    </Box>
  );
};

export default Header;
