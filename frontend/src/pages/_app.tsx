import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "@/components/Header";


interface MyAppProps extends AppProps {
  pageProps: {
    pageTitle: string;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
      <ApolloProvider client={client}>
        <ChakraProvider>
        <Header />
              <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
  );
}