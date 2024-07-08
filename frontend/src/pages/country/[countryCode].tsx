import { CountryQuery, CountryQueryVariables, getCountryDocument } from '@/graphql/generated/schema';
import { useQuery } from '@apollo/client';
import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CountryDetailPage = () => {
    const router = useRouter()
    const { countryCode } = router.query;
    const { loading, error, data } = useQuery<CountryQuery, CountryQueryVariables>(getCountryDocument, {
    variables: { code: countryCode as string},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.country) return <p>Country not found</p>;

  const { name, emoji, continent } = data.country;

  return (
    <>
    <Button mt={4} ml={4} onClick={() => router.push('/')}>
          Home
        </Button>
    <Center>
      <Box p={4} textAlign="center">
        <Center>
        <Image
          src={`https://flagcdn.com/${data.country.code?.toLowerCase()}.svg`}
          alt={`${name} flag`}
          boxSize="50px"
          objectFit="cover"
          mb={2}
        /></Center>
        <Heading as="h1" size="lg" mb={2}>
          Name : {name} ({emoji})
        </Heading>
        {continent && <Text mt={2}>Continent: {continent.name}</Text>}
      </Box>
    </Center>
    </>
  );
}
export default CountryDetailPage;
