import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from '@/lib/apollo-client';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = initializeApollo()
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
