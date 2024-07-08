import { useQuery } from '@apollo/client';
import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { CountriesQuery, Country, getCountriesDocument } from '@/graphql/generated/schema';
import Link from 'next/link';

const CountryList = () => {
  const { loading, error, data } = useQuery<CountriesQuery>(getCountriesDocument);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {data?.countries.map((country: Country) => (
          <Link key={country.code} href={`/country/${country.code}`} passHref>
            <Flex
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              alignItems="center"
              _hover={{ boxShadow: "xl" }}
              transition="box-shadow 0.2s"
              direction="column"
              textAlign="center"
              cursor="pointer"
            >
              <Image
                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                alt={`${country.name} flag`}
                boxSize="50px"
                objectFit="cover"
                mb={2}
              />
              <Text mt={2} fontSize="lg" fontWeight="bold">{country.name}</Text>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CountryList;
