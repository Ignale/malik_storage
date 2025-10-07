"use client"

import React from 'react'
import { ApolloProvider } from "@apollo/client";
import { client } from '@/lib/client';
import SessionProvider from '@/session/SessionProvider';
import ProtectedRoute from '@/session/ProtectedRoute'
import { usePathname } from 'next/navigation'

export default function RootProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const protectedRoutes = ['/giftcards', '/user', '/addnew']
  const isProtected = !!protectedRoutes.includes(pathname || '')

  return (
    // <SessionProvider>
    <ApolloProvider client={client}>
      {isProtected ? <ProtectedRoute>{children}</ProtectedRoute> : children}
    </ApolloProvider>
    // </SessionProvider>
  )
}
