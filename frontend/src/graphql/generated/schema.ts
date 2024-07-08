import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
  };

  export type Continent = {
    __typename?: 'Continent';
    id?: Scalars['ID'];
    name: Scalars['String'];
};

export type Country = {
    __typename?: 'Country';
    code: Scalars['String'];
    name: Scalars['String'];
    id?: Scalars['ID'];
    emoji: Scalars['String'];
    continent?: Continent;
  };

  export type NewContinentInput = {
    name: Scalars['String'];
  };
  export const addCountryDocument = gql`
    mutation addCountry($data: NewCountryInput!) {
  addCountry(data: $data) {
    name
    code
    emoji
  }
}
    `;

    export type NewCountryInput = {
      name: Scalars['String'];
      code: Scalars['String'];
      emoji: Scalars['String'];
    };
    
    export type CountryMutationVariables = Exact<{
      data: Country;
    }>;
    
    
    export type CountryMutation = { __typename?: 'Mutation', addCountry: { __typename?: 'Country', code: string, name: string, emoji: string } };
    export function useCreateMutation(baseOptions?: Apollo.MutationHookOptions<CountryMutation, CountryMutationVariables>) {
      const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<CountryMutation, CountryMutationVariables>(addCountryDocument, options);
  }
  
  export const getCountriesDocument = gql`
  query Countries {
  countries {
    id
    code
    name
    emoji
    continent {
      id
      name
      }
    }
  }
  `;
  export type CountriesQuery = {
    __typename?: 'Query';
    countries: Array<{
      __typename?: 'Country';
      id: string;
      code: string;
      name: string;
      emoji: string;
      continent: { id: string; name: string };
    }>;
  };

  export const getCountryDocument = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export type CountryQuery = {
  __typename?: 'Query';
  country: {
    __typename?: 'Country';
    id: string;
    code: string;
    name: string;
    emoji: string;
    continent?: {
      id: string;
      name: string;
    } | null;
  };
};

export type CountryQueryVariables = {
  code: string;
};

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;
export function useCountryQuery(
  baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(
    getCountriesDocument,
    options
  );
}