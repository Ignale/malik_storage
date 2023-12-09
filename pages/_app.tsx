import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { ApolloProvider } from "@apollo/client";
import { client } from '@/lib/client';
import type { AppProps } from 'next/app'
import SessionProvider from '../session/SessionProvider';
import ProtectedRoute from '../session/ProtectedRoute'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  // const apolloClient = initializeApollo()
  const router = useRouter()
  const protectedRoutes = ['/giftcards', '/user', '/addnew']
  const isProtected = !!protectedRoutes.includes(router.pathname)
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        {isProtected ? <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute> : <Component {...pageProps} />}
      </ApolloProvider>
    </SessionProvider>


  )
}
